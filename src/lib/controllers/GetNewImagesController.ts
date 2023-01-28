import { NextApiRequest, NextApiResponse } from "next";
import { getBody, getQuery } from "nextjs-backend-helpers";
import { StatusCodes } from "../enums/StatusCodes";
import { AuthenticatedBaseController } from "./BaseController";
import { ImageRequest } from "@/types/sharedTypes";
import ArgumentError from "../errors/bad-request/ArgumentError";
import RepositoryOpenAi from "../repositories/DalleRepository";
import InitialTransfersRepository from "../repositories/TransfersRepository";

class GetNewImagesController extends AuthenticatedBaseController {
    private RepositoryOpenAAI = new RepositoryOpenAi();
    private s3Repository = new InitialTransfersRepository();

    constructor() {
        super();

        this.rescue(ArgumentError, (error, request, response) => {
            response.status(StatusCodes.InvalidRequest).json({
                errors: [error.message],
            });
        });
    }

    // this action is triggered when the
    // /api/user/[id] route is sent a get request
    async get(_request: NextApiRequest, res: NextApiResponse) {
        let { n, size, prompt } = getBody<ImageRequest>(_request);

        if (n < 1 || n > 10) {
            throw new ArgumentError("You may only request up to 10 images");
        }

        if (prompt.length > 500) {
            prompt = prompt.slice(0, 500);
        }

        const response = await this.RepositoryOpenAAI.RequestNewImageSet(prompt, n, size);
        const thing = await this.s3Repository.SaveDalleUrlsToS3(response.urls, response.metaData)



        return res.json({
            data: images,
        });
    }
}

export default GetNewImagesController;
