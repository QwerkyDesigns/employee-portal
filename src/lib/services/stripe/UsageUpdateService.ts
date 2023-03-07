import { prisma } from "@/lib/client/prisma";

export async function updateUsageLimit(stripeCustomerId: string, newFunds: number) {
    const account = await prisma.Account.findUnique({
        where: {
            stripeCustomerId: stripeCustomerId,
        },
        include: {
            usage: true,
        },
    });

    if (account === null) {
        throw new Error("Account not found");
    }

    const newAvailableFunds = (account.usage?.available_funds || 0) + newFunds;

    await prisma.Usage.update({
        where: {
            id: account.usage?.id,
        },
        data: {
            availableFunds: newAvailableFunds, // TODO: we should change the colums from snake_case to camelCase.
            // if we want them to be snake_case, then Prisma has a @map and @@map directive here: https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#mapping-model-names-to-tables-or-collections
        },
    });
}
