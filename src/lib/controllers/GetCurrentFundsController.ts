import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Logger } from 'nextjs-backend-helpers';
import { prisma } from '../client/prisma';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import { GetAccount, GetAccountByEmail } from '../db/GetAccount';
import { CreateUsage } from '../db/CreateUsage';


export class GetCurrentFundsController extends AuthenticatedBaseController {
    async get(req: NextApiRequest, res: NextApiResponse<GetCurrentFundsResponse>) {
        const session = await getSession({ req });
        const emailAddress = session?.user?.email;
        if (emailAddress) {
            const account = await GetAccountByEmail(emailAddress);
            if (account?.usageId === null || account?.usageId === undefined) {
                console.log("CREATING USAGE RECORD")
                await CreateUsage(account);
            }

            const currentFunds = await getFunds(emailAddress);
            Logger.debug({
                message: 'current funds',
                currentFunds
            });
            if (currentFunds) {
                return res.json({ currentFunds });
            }
            throw new Error('CurrentFunds was undefined');
        }
        throw new Error('Could not find the user account for {emailAddress}');
    }
}

export type GetCurrentFundsResponse = {
    currentFunds: number;
};

async function getFunds(emailAddress: string): Promise<number | undefined> {
    const user = await prisma.user.findUnique({
        where: {
            email: emailAddress
        },
        include: {
            accounts: true
        }
    });

    const account = user?.accounts[0];

    const usageId = account?.usageId || undefined;

    const usage = await prisma.usage.findUnique({
        where: {
            id: usageId
        }
    });

    const currentFunds = usage?.availableFunds;
    return currentFunds;
}
