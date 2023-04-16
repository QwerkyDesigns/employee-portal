import { prisma } from "../client/prisma";
import { Account } from "@prisma/client";

export async function UpdateUsage(creditsToSpend: number, account: Account) {
    if (account?.usageId !== null) {

        const currentUsage = await prisma.usage.findUnique({
            where: {
                id: account?.usageId ?? undefined
            }
        })

        const update = currentUsage?.availableFunds === null ? null : currentUsage!.availableFunds - creditsToSpend;
        if (update !== undefined && update !== null) {

            await prisma.usage.update({
                where: {
                    id: account?.usageId ?? undefined
                },
                data: {
                    availableFunds: update
                }
            });
        }
    }
}
