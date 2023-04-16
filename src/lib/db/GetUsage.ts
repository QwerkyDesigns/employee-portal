import { prisma } from "../client/prisma";
import { Session } from "next-auth";
import { GetAccountByEmail } from "./GetAccount";

export async function GetUsage(session: Session) {

    if (session?.user?.email === null || session?.user?.email === undefined) {
        throw new Error("Session was null in GetUsage");
    }

    const account = await GetAccountByEmail(session?.user?.email);
    return await prisma.usage.findUnique({
        where: {
            id: account?.usageId ?? undefined
        }
    });
}
