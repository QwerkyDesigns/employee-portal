import { NextApiRequest, NextApiResponse } from "next";
import { Controller } from "nextjs-backend-helpers";
import UnAuthenticatedError from "../../errors/bad-request/UnAuthenticatedError";
import { getSession } from "next-auth/react";
import { rescue_Error, rescue_UnAuthenticatedError } from "./RescueSupport";
import { prisma } from "@/lib/client/prisma";

export class AuthenticatedBaseController extends Controller {
    public readonly db: typeof prisma;

    constructor() {
        super();

        this.db = prisma;
        this.before(async (req: NextApiRequest, res: NextApiResponse) => {
            const session = await getSession({ req });
            if (!session) {
                throw new UnAuthenticatedError("You're not allowed to fking do that.");
            }
        });

        this.rescue(UnAuthenticatedError, rescue_UnAuthenticatedError);

        // This comes last to catch any other errors we haven't defined
        this.rescue(Error, rescue_Error);
    }
}
