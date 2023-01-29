import { AuthenticatedBaseController } from "@/lib/controllers/BaseController";
import InitialTransfersRepository from "@/lib/repositories/TransfersRepository";
import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";

export class GetPresignedPost extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async post(req: NextApiRequest, res: NextApiResponse) {
        const repo = new InitialTransfersRepository();
        const result = await repo.GetPresignedPostUrl();
        return res.json({ ...result });
    }
}

export type GetPresignedPostResponse = {
    presignedUrlForUploading: S3.PresignedPost;
    presignedForViewing: string;
};
