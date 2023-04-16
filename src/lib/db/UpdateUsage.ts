import { GetAccount } from "./GetAccount";
import { prisma } from "../client/prisma";

export async function UpdateUsage(creditsToSpend: number) {
    const account = await GetAccount();
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
