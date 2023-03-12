import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../client/prisma';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';

export class GetCurrentFundsController extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async get(req: NextApiRequest, res: NextApiResponse<GetCurrentFundsResponse>) {
        const session = await getSession({ req });
        const emailAddress = session?.user?.email;
        if (emailAddress) {
            const currentFunds = await GetFunds(emailAddress);
            console.log('current funds: ' + currentFunds);
            if (currentFunds) {
                return res.json({ currentFunds });
            }
            throw new Error('CurrentFunds was undefined');
        }
        throw new Error(`Could not find the user account for {emailAddress}`);
    }
}

export type GetCurrentFundsResponse = {
    currentFunds: number;
};

async function GetFunds(emailAddress: string): Promise<number | undefined> {
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
