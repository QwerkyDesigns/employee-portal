import ArgumentError from "@/errors/BadRequest/ArgumentError";
import { NextApiRequest, NextApiResponse } from "next";
import { install, getBody, getQuery } from "nextjs-backend-helpers";
import { StatusCodes } from "../enums/StatusCodes";
import { AuthenticatedBaseController } from "./BaseController";
import { ImageRequest } from "@/types/sharedTypes";
import RepositoryOpenAi from "@/repositories/RepositoryOpenAi";

class GetNewImageController extends AuthenticatedBaseController {
  private RepositoryOpenAAI = new RepositoryOpenAi();

  constructor() {
    super();

    this.RepositoryOpenAAI = new RepositoryOpenAi();

    this.rescue(ArgumentError, (error, request, response) => {
      response.status(StatusCodes.InvalidRequest).json({
        errors: [error.message],
      });
    });
  }

  // this action is triggered when the
  // /api/user/[id] route is sent a get request
  async get(_request: NextApiRequest, res: NextApiResponse) {
    const { n, size, prompt } = getBody<ImageRequest>(_request);

    if (n < 1 || n > 10) {
      throw new ArgumentError("You may only request up to 10 images");
    }

    return response.json({
      data: user,
    });
  }
}

export default install(GetNewImageController);
