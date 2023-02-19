import axios, { AxiosInstance } from "axios";
import { AxiosClient } from "../client/frontendAxiosClient";

export type PrintifyImageResource = {
  id: string;
  file_name: string;
  height: number;
  width: number;
  size: number;
  mime_type: number;
  preview_url: string;
  upload_time: string;
};

export type PrintifyImageUploadRequestPayload = {
  file_name: string;
  url: string;
};

const HEADERS = {
  "content-type": "application/json;charset=utf-8",
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImMzMGI0MjA4NzYxZTM5YzgzNzMwZTJkNTJhMGRlNGI3MGNhNjEwOTA5MjQyYmUwMjc2OTYyZDZmODI5M2ZmY2U5ZTZhNWQzODc2MWZjYTZmIiwiaWF0IjoxNjc2Nzk0NzkwLjcyMDcxMSwibmJmIjoxNjc2Nzk0NzkwLjcyMDcxMywiZXhwIjoxNzA4MzMwNzkwLjcxNTkzOSwic3ViIjoiMTE3ODYxNjgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.ARI94d_8g3LTnra0FY2_aUf_zXanXwZ04YGX2UeuyiN0Sc_4EAJ10Jn2PijIYrdlwBTX3kMuNZxuD9a2K_8",
};
const BASE_URL = "https://api.printify.com/v1";

class PrintifyRepository {
  //   private client = new AxiosClient();
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create();
    this.client.defaults.baseURL = BASE_URL;
    this.client.defaults.headers = {
      ...this.client.defaults.headers,
      ...HEADERS,
    };
  }

  public async UploadImageToShopify(fileName: string, url: string) {
    const payload: PrintifyImageUploadRequestPayload = {
      file_name: fileName,
      url,
    };

    const response = await this.client.post<
      PrintifyImageUploadRequestPayload,
      PrintifyImageResource
    >("uploads/images.json", payload); // set base url in client, and then fix this call add payload"
    console.log(response);
    if (response) {
      return response;
    }
    throw new Error("FAILURE TO LAOD TO PRINTIFY");
  }
}

export default PrintifyRepository;
