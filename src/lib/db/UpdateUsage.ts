import { GetAccount } from "./GetAccount";
import { prisma } from "../client/prisma";
import { User } from "next-auth";

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

export async function CreateUsage(user: User, initialCredits: number) {
    const account = await GetAccount(user);
    await prisma.usage.create({
        data: {
            availableFunds: initialCredits,
            Account: {
                connect: {
                    id: account?.id
                }
            }
        },
        include: {
            Account: true
        }
    })
}