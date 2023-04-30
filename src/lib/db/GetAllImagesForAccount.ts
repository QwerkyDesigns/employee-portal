import { prisma } from "../client/prisma";
import { Images } from "@prisma/client";


export async function GetAllImagesForAccount(email: string): Promise<Images[]> {
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
            images: true
        }
    });

    const images = account?.images;
    if (images === null || images === undefined) {
        throw new Error("Couldn't find account images");
    }
    return images;
}
