import { prisma } from "../client/prisma";
import { Account } from "@prisma/client";

export async function CreateImageRecord(storageKey: string, promptUsed: string, account: Account) {
    await prisma.images.create({
        data: {
            storageKey,
            promptUsed,
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
