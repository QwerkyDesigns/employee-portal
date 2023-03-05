import { prisma } from "@/lib/client/prisma";

export interface IUsageUpdateService {
    UpdateUsageLimit(stripeCustomerId: string, newFunds: number): void;
}

class UsageUpdateService implements IUsageUpdateService {
    public readonly db: typeof prisma;

    constructor() {
        // TODO: We will abstract the persistence layer later if we need to (i.e. when we start making db calls all over the place)
        this.db = prisma; // we should avoid assigning this to an instance variable. It makes it difficult to test.
    }

    public async UpdateUsageLimit(stripeCustomerId: string, newFunds: number) {
        const account = await this.db.account.findUnique({
            where: {
                stripe_customer_id: stripeCustomerId,
            },
            include: {
                usage: true,
            },
        });

        if (account === null) {
            throw new Error("Account not found");
        }

        const newAvailableFunds = (account.usage?.available_funds || 0) + newFunds

        const updatedUsage = await this.db.usage.update({
            where: {
                id: account.usage?.id,
            },
            data: {
                available_funds: newAvailableFunds // TODO: we should change the colums from snake_case to camelCase.
                // if we want them to be snake_case, then Prisma has a @map and @@map directive here: https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#mapping-model-names-to-tables-or-collections
            },
        });
    }
}

export default UsageUpdateService;
