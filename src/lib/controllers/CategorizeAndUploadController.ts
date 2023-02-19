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
import presignedPosts from "@/pages/api/create/presigned-posts";

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
    // get the image ID from the request (need to send that up)
    var { imageKey, productName } =
      getBody<CreateImageCategorizationRequest>(req);

    console.log("Hitting the controller");
    console.log(imageKey);
    console.log(productName);
    var preSignedUrl =
      await this.uncategorizedS3BucketRepository.createPresignedUrlForViewing(
        imageKey
      );

    console.log(preSignedUrl);

    await this.uncategorizedS3BucketRepository.MoveFileFromThisContainerTo(
      this.archiveStore.bucketName,
      imageKey
    );


    // post a request to printify (need to create a printify repository)
    const response = await this.shopifyRepository.UploadImageToShopify(
      productName,
      preSignedUrl
    );

    console.log(response)

    // delete the image from the old s3 container
    // await this.uncategorizedS3BucketRepository.deleteFile(imageKey);

    return res.json({
      ...response,
    });
  }
}

export type CreateImageCategorizationRequest = {
  imageKey: string;
  productName: string;
};

export type CreateImageCategorizationResponse = PrintifyImageResource & {};

export default CategorizeAndUploadController;
