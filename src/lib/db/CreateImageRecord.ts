import { prisma } from "../client/prisma";
import { Account } from "@prisma/client";
import { ImageOrigin } from "../enums/ImageOrigin";
import { ImageState } from "../enums/ImageState";

export async function CreateImageRecord(storageKey: string, promptUsed: string, originId: ImageOrigin, account: Account) {
    await prisma.images.create({
        data: {
            storageKey,
            promptUsed,
            originId: originId.toString(),
            imageState: ImageState.Uncategorized.toString(),
            Account: {
                connect: {
                    id: account?.id
                }
            }
        },
        include: {
            Account: true
        }
    })
}
