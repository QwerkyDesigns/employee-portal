import { getServerSession } from "next-auth";
import { prisma } from "../client/prisma";

export async function GetUser() {
    const session = await getServerSession();
    return await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? ''
        }
    })
}


