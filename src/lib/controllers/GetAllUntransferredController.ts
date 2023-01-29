import { NextApiRequest, NextApiResponse } from "next";
import { getBody, getQuery } from "nextjs-backend-helpers";
import { AuthenticatedBaseController } from "./BaseController";
import { ImageRequest } from "@/types/sharedTypes";
import ArgumentError from "../errors/bad-request/ArgumentError";
import InitialTransfersRepository from "../repositories/TransfersRepository";
import { ImageOrigin } from "../enums/ImageOrigin";

class GetAllUntransferredController extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async get(req: NextApiRequest, res: NextApiResponse) {
        const repo = new InitialTransfersRepository();

        const { origin } = getQuery<{ origin: string }>(req);
        console.log(origin);

        let uploadOrigin;
        if (origin === "dalle") {
            uploadOrigin = ImageOrigin.Dalle;
        } else if (origin === "upload") {
            uploadOrigin = ImageOrigin.Upload;
        } else {
            throw new ArgumentError("query must be provided, one of 'dalle' or 'upload'");
        }

        const allViewingUrls = await repo.RetrieveAllTransfers(uploadOrigin);
        console.log(allViewingUrls)
        return res.json({
            allViewingUrls,
        });
    }
}

export type GetAllUntransferredResponse = {
    allViewingUrls: string[];
};

export default GetAllUntransferredController;
