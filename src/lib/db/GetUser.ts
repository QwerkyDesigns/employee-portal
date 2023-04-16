import { Session, getServerSession } from "next-auth";
import { prisma } from "../client/prisma";

export async function GetUser(session: Session) {
    return await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? ''
        }
    })
}


