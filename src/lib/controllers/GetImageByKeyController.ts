import { NextApiRequest, NextApiResponse } from "next";
import { getQuery } from "nextjs-backend-helpers";
import { AuthenticatedBaseController } from "./BaseController";
import UnCategorizedImagesStore from "../stores/UncategorizedImagesStore";
import queryString from "query-string";
import ArgumentError from "../errors/bad-request/ArgumentError";

class GetImageByKeyController extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async get(req: NextApiRequest, res: NextApiResponse) {
        const repo = new UnCategorizedImagesStore();

        const { key } = getQuery<{ key: string }>(req);
        const { key: parsedKey } = queryString.parse(`key=${key}`);

        if (parsedKey && typeof parsedKey === "string") {
            const url = await repo.createPresignedUrlForViewing(parsedKey);
            const encodedUrl = queryString.stringify({ url });

            const returnable = { url: encodedUrl } as GetSingleImageUrlResponse; 
            return res.json(returnable);
        } else {
            throw new ArgumentError("Could not parse file key param");
        }
    }
}

export type GetSingleImageUrlResponse = {
    url: string;
};

export default GetImageByKeyController;
