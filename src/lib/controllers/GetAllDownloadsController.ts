import { NextApiRequest, NextApiResponse } from "next";
import { getBody } from "nextjs-backend-helpers";
import { AuthenticatedBaseController } from "./BaseController";
import { ImageRequest } from "@/types/sharedTypes";
import ArgumentError from "../errors/bad-request/ArgumentError";

class GetAllUntransferredController extends AuthenticatedBaseController {

    constructor() {
        super();
    }

    // this action is triggered when the
    // /api/user/[id] route is sent a get request
    async get(_request: NextApiRequest, res: NextApiResponse) {
        const { n, size, prompt } = getBody<ImageRequest>(_request);

        if (n < 1 || n > 10) {
            throw new ArgumentError("You may only request up to 10 images");
        }


        return res.json({
            data: images,
        });
    }
}

export default GetAllUntransferredController;
