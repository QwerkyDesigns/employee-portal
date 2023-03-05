import { NextApiRequest, NextApiResponse } from "next";
import { Controller } from "nextjs-backend-helpers";
import prismaClient from "../../client/prisma";
import UnAuthenticatedError from "../../errors/bad-request/UnAuthenticatedError";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { rescue_Error, rescue_UnAuthenticatedError } from "./RescueSupport";

export class AuthenticatedBaseController extends Controller {
    public readonly db: PrismaClient;

    constructor() {
        super();

        this.db = prismaClient;
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
