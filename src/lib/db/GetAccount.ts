import { prisma } from "../client/prisma";
import { Account } from "@prisma/client";

export async function GetAccountByEmail(email: string): Promise<Account> {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (user === null) {
        throw new Error("User not found: " + email)
    }

    const account = await prisma.account.findFirst({
        where: {
            userId: user.id
        }
    })

    if (account === null) {
        throw new Error("Failed to retrieve account for: " + email)
    }
    return account;
}


