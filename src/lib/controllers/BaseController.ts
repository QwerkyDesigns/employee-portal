import { UnAuthenticatedHeader } from "@/components/header/UnAuthenticatedHeader";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Controller } from "nextjs-backend-helpers";
import { StatusCodes } from "../enums/StatusCodes";
import UnAuthenticatedError from "../errors/bad-request/UnAuthenticatedError";

export class AuthenticatedBaseController extends Controller {
    constructor() {
        super();

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
        });
    }
}
