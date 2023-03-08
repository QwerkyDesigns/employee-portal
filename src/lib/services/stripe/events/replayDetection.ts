import { prisma } from "@/lib/client/prisma";

export async function isReplyAttack(signature: string) {
    const previouswebhooks = await prisma.stripeWebhooks.count({
        where: {
            payloadSignature: signature,
        },
    });

    return previouswebhooks !== 0;
}
