import { NextApiRequest, NextApiResponse } from "next";
import { getBody } from "nextjs-backend-helpers";
import { StatusCodes } from "../enums/StatusCodes";
import { AuthenticatedBaseController } from "./BaseController";
import ArgumentError from "../errors/bad-request/ArgumentError";
import UnCategorizedImagesStore from "../stores/UncategorizedImagesStore";
import PrintifyRepository, {
  PrintifyImageResource,
} from "../repositories/ShopifyRepository";
import ArchivedImagesStore from "../stores/ArchivedImagesStore";

class CategorizeAndUploadController extends AuthenticatedBaseController {
  private uncategorizedS3BucketRepository = new UnCategorizedImagesStore();
  private archiveStore = new ArchivedImagesStore();

  private shopifyRepository = new PrintifyRepository();
  constructor() {
    super();

    this.rescue(ArgumentError, (error, request, response) => {
      response.status(StatusCodes.InvalidRequest).json({
        errors: [error.message],
      });
    });
  }

  async post(
    req: NextApiRequest,
    res: NextApiResponse<CreateImageCategorizationResponse>
  ) {
    var { imageKey, productName } =
      getBody<CreateImageCategorizationRequest>(req);

    var preSignedUrl =
      await this.uncategorizedS3BucketRepository.createPresignedUrlForViewing(
        imageKey
      );

    // post a request to printify (need to create a printify repository)
    const response = await this.shopifyRepository.UploadImageToShopify(
      productName,
      preSignedUrl
    );

    if (response === null) throw new Error("NULL RESPONSE");

    await this.uncategorizedS3BucketRepository.MoveFileFromThisContainerTo(
      this.archiveStore.bucketName,
      imageKey
    );

    return res.json({
      id: response.id,
      file_name: response.file_name,
      height: response.height,
      width: response.width,
      size: response.size,
      mime_type: response.mime_type,
      preview_url: response.preview_url,
      upload_time: response.upload_time,
    });
  }
}

export type CreateImageCategorizationRequest = {
  imageKey: string;
  productName: string;
};

export type CreateImageCategorizationResponse = PrintifyImageResource & {};

export default CategorizeAndUploadController;
