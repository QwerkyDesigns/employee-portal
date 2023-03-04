import prismaClient from "@/lib/client/prisma";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface IUsageUpdateService {
    UpdateUsageLimit(stripeCustomerId: string, newFunds: number): void;
}

class UsageUpdateService implements IUsageUpdateService {
    public readonly db: PrismaClient;

    constructor() {
        // TODO: We will abstract the persistence layer later if we need to (i.e. when we start making db calls all over the place)
        this.db = prismaClient;
    }

    public async UpdateUsageLimit(stripeCustomerId: string, newFunds: number) {
        const account = await this.db.account.findUnique({
            where: {
                stripe_customer_id: stripeCustomerId,
            },
            include: {
                usage: true,
            },
        } as Prisma.AccountFindUniqueArgs);

        if (!account) {
            throw new Error("Account not found");
        }

        const updatedUsage = await this.db.usage.update({
            where: {
                id: account.usage.id, // TODO: This isn't finding 'usage' correctly - help
            },
            data: {
                availableFunds: account.usage.availableFunds + newFunds,
            },
        } as Prisma.);
    }
}

export default UsageUpdateService;
