import { Account } from "@prisma/client";
import { prisma } from "../client/prisma";
const NEW_ACCOUNT_CREDITS = 500000; // five hundred thousands tokens == $1

export async function CreateUsage(account: Account) {
    await prisma.usage.create({
        data: {
            availableFunds: NEW_ACCOUNT_CREDITS,
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