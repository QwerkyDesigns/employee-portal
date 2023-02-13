import { NextApiRequest, NextApiResponse } from "next";
import ArchivedImagesStore from "../stores/ArchivedImagesStore";
import { AuthenticatedBaseController } from "./BaseController";

class GetAllArchivedController extends AuthenticatedBaseController {
    constructor() {
        super();
    }

    async get(req: NextApiRequest, res: NextApiResponse) {
        const repo = new ArchivedImagesStore();

       
        return res.json({
            urls: allViewingUrls,
        });
    }
}

export type GetAllArchivedResponse = {
    urls: string[];
};

export default GetAllArchivedController;
