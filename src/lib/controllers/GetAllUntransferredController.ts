import { NextApiRequest, NextApiResponse } from 'next';
import { getQuery } from 'nextjs-backend-helpers';
import { AuthenticatedBaseController } from './base/AuthenticatedBaseController';
import ArgumentError from '../errors/bad-request/ArgumentError';
import { ImageOrigin } from '../enums/ImageOrigin';
import UnCategorizedImagesStore from '../stores/UncategorizedImagesStore';
import { PresignedUrlWithMeta } from '../stores/s3Core/S3Core';

class GetAllUntransferredController extends AuthenticatedBaseController {
  constructor() {
    super();
  }

  parseImageOrigin = (originQueryParam: string) => {
    switch (originQueryParam) {
      case ImageOrigin.Dalle:
        return ImageOrigin.Dalle;
      case ImageOrigin.Upload:
        return ImageOrigin.Upload;
      default:
        throw new ArgumentError(
          `Query must be provided, one of '${ImageOrigin.Dalle}' or '${ImageOrigin.Upload}'`
        );
    }
  };

  async get(
    req: NextApiRequest,
    res: NextApiResponse<GetAllUntransferredResponse>
  ) {
    const repo = new UnCategorizedImagesStore();

    const { origin } = getQuery<{ origin: string }>(req);
    const imageOrigin = this.parseImageOrigin(origin);
    const allViewingUrls = await repo.RetrieveAllTransfers(imageOrigin);
    return res.json({ imageMetas: allViewingUrls });
  }
}

export type GetAllUntransferredResponse = {
  imageMetas: PresignedUrlWithMeta[];
};

export type UnCategorizedImageMeta = {
  url: string;
  key: string;
};

export default GetAllUntransferredController;
