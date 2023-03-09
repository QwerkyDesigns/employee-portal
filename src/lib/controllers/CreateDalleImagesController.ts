import { NextApiRequest, NextApiResponse } from 'next';
import { getBody } from 'nextjs-backend-helpers';
import { StatusCodes } from '../enums/StatusCodes';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import RepositoryOpenAi from '../repositories/DalleRepository';
import { ImageSize } from '../enums/ImageSizes';
import UnCategorizedImagesStore from '../stores/UncategorizedImagesStore';
import { ImageLocationDetails } from '../stores/s3Core/S3Core';

class CreateDalleImagesController extends AuthenticatedBaseController {
  private RepositoryOpenAAI = new RepositoryOpenAi();
  private s3Repository = new UnCategorizedImagesStore();

  constructor() {
    super();

    this.rescue(ArgumentError, (error, request, response) => {
      response.status(StatusCodes.InvalidRequest).json({
        errors: [error.message],
      });
    });
  }

  async post(req: NextApiRequest, res: NextApiResponse) {
    let { n, size, prompt } = getBody<CreateDalleImagesRequest>(req);

    if (n < 1 || n > 10) {
      throw new ArgumentError('You may only request up to 10 images');
    }

    if (prompt.length > 500) {
      prompt = prompt.slice(0, 500);
    }

    const response = await this.RepositoryOpenAAI.RequestNewImageSet(
      prompt,
      n,
      size
    );

    const imageLocationdetails = await this.s3Repository.SaveDalleUrlsToS3(
      response.urls,
      response.metaData
    );
    return res.json({
      details: imageLocationdetails,
    });
  }
}

export type CreateDalleImagesRequest = {
  n: number;
  size: ImageSize;
  prompt: string;
};

export type CreateDalleImagesResponse = {
  details: ImageLocationDetails[];
};

export default CreateDalleImagesController;
