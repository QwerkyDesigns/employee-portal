import { GetAccount } from "./GetAccount";
import { getServerSession } from "next-auth";
import { prisma } from "../client/prisma";

export async function GetUsage() {
    const account = await GetAccount();
    return await prisma.usage.findUnique({
        where: {
            account: account.id
        }
    });
}
