import { prisma } from '@/lib/client/prisma';
import { Logger } from 'nextjs-backend-helpers';

export async function updateUsageLimit(stripeCustomerId: string, newFunds: number) {
    const account = await prisma.account.findUnique({
        where: {
            stripeCustomerId: stripeCustomerId
        },
        include: {
            usage: true
        }
    });

    if (account === null) {
        throw new Error('Account not found');
    }

    const newAvailableFunds = (account.usage?.availableFunds || 0) + newFunds;
    Logger.debug({ message: `New available funds: ${newAvailableFunds}` });

    await prisma.usage.update({
        where: {
            id: account.usage?.id
        },
        data: {
            availableFunds: newAvailableFunds
        }
    });
}
