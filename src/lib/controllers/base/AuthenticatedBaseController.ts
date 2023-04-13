import { NextApiRequest, NextApiResponse } from 'next';
import { Controller, errors } from 'nextjs-backend-helpers';
import { StatusCodes } from '../../enums/StatusCodes';
import UnAuthenticatedError from '../../errors/bad-request/UnAuthenticatedError';
import authOptions from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth';

export class AuthenticatedBaseController extends Controller {
    constructor() {
        super();

        this.rescue(Error, (error, _request, response) => {
            response.status(StatusCodes.ServerError).json(errors([error.message]));
        });

        // this.rescue(S3DownloadError, (error, req, response) => {
        //     response.status(StatusCodes.ServerError).json(errors([error.message]));
        // });

        this.before(async (req: NextApiRequest, res: NextApiResponse) => {
            const session = await getServerSession(req, res, authOptions);
            if (session) {
                return;
            }
            throw new UnAuthenticatedError('You\'re not allowed to fking do that.');
        });

        this.rescue(UnAuthenticatedError, (error, _request, response) => {
            response.status(StatusCodes.NotAuthorized).json({
                errors: [error.name, error.message]
            });
        });
    }
}
