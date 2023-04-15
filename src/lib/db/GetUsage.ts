import { GetAccount } from "./GetAccount";
import { prisma } from "../client/prisma";

export async function GetUsage() {
    const account = await GetAccount();
    return await prisma.usage.findUnique({
        where: {
            id: account?.usageId ?? undefined
        }
    });
}
