import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Logger } from 'nextjs-backend-helpers';
import { prisma } from '../client/prisma';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';

export class GetCurrentFundsController extends AuthenticatedBaseController {
    async get(req: NextApiRequest, res: NextApiResponse<GetCurrentFundsResponse>) {
        const session = await getSession({ req });
        const emailAddress = session?.user?.email;
        if (emailAddress) {
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
    const account = await prisma.account.findUnique({
        where: {
            email: emailAddress
        },
        include: {
            usage: true
        }
    });

    const currentFunds = account?.usage?.availableFunds;
    return currentFunds;
}
