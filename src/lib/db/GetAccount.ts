import { GetUser } from "./GetUser";
import { prisma } from "../client/prisma";
import { User } from "next-auth";

export async function GetAccount(user: User | null) {
    let u = user;
    if (!u) {
        u = await GetUser();
    }
    return await prisma.account.findFirst({
        where: {
            userId: u?.id
        }
    });
}

