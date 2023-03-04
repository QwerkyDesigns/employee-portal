import { NextApiRequest, NextApiResponse } from "next";
import { Controller } from "nextjs-backend-helpers";
import prismaClient from "../../client/prisma";
import { StatusCodes } from "../../enums/StatusCodes";
import UnAuthenticatedError from "../../errors/bad-request/UnAuthenticatedError";
import { PrismaClient } from "@prisma/client";

export class AuthenticatedBaseController extends Controller {
    public readonly db: PrismaClient;

    constructor() {
        super();

        this.db = prismaClient;

        this.rescue(Error, (error, request, response) => {
            response.status(StatusCodes.ServerError).json({
                errors: [error.message],
            });
        });

        this.rescue(UnAuthenticatedError, (error, request, response) => {
            response.status(StatusCodes.NotAuthorized).json({
                errors: [error.name, error.message],
            });
        });

        this.before(async (req: NextApiRequest, res: NextApiResponse) => {
            // const session = await unstable_getServerSession(req, res, authOptions);
            // if (!session) {
            //     throw new UnAuthenticatedError("You're not allowed to fking do that.");
            // }

            await prismaClient.$connect(); //TODO: Umm - pretty sure this isn't needed. Right?
        });
    }
}
