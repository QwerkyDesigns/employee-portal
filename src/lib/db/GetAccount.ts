import { GetUser } from "./GetUser";
import { prisma } from "../client/prisma";
import { User, Account } from "@prisma/client";

export async function GetAccount(user: User | null = null): Promise<Account | null> {
    let u = user;
    if (!u || u === null) {
        u = await GetUser();
    }

    if (u === null) {
        throw new Error("User not found!")
    }
    return await prisma.account.findFirst({
        where: {
            userId: u?.id
        }
    });
}


export async function GetAccountByEmail(email: string): Promise<Account | null> {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (user === null) {
        throw new Error("User not found: " + email)
    }

    return await prisma.account.findFirst({
        where: {
            userId: user.id
        }
    })
}