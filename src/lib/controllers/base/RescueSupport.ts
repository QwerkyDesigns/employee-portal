import { StatusCodes } from "@/lib/enums/StatusCodes";
import UnAuthenticatedError from "@/lib/errors/bad-request/UnAuthenticatedError";
import { NextApiRequest, NextApiResponse } from "next";

export const rescue_Error = (error: Error, request: NextApiRequest, response: NextApiResponse) => {
    response.status(StatusCodes.ServerError).json({
        errors: [error.message],
    });
};

export const rescue_UnAuthenticatedError = (error: Error, request: NextApiRequest, response: NextApiResponse) => {
    response.status(StatusCodes.NotAuthorized).json({
        errors: [error.name, error.message],
    });
};
