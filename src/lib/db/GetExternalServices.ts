import { prisma } from "../client/prisma";
import { ExternalServiceKeys } from "@prisma/client";


export async function GetExternalServices(email: string): Promise<ExternalServiceKeys> {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user === null) {
        throw new Error("User not found: " + email);
    }

    const account = await prisma.account.findFirst({
        where: {
            userId: user.id
        },
        include: {
            externalServices: true
        }
    });

    if (account === null || account?.externalServices === null) {
        throw new Error("Failed to retrieve account");
    }

    const services = account.externalServices;
    return services;
}
