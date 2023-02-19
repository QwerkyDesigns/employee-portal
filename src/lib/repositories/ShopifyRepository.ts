import { AxiosClient } from "../client/frontendAxiosClient";

export type PrintifyImageResource =  {
    id: string,
    file_name: string,
    height: number,
    widgth: number,
    size: number,
    mime_type: number,
    preview_url: string,
    upload_time: string
}

export type PrintifyImageUploadRequestPayload = {
    file_name: string,
    url: string,
}

class PrintifyRepository {
  private client = new AxiosClient("https://api.printify.com/v1");
  constructor() {}

    public async UploadImageToShopify(fileName: string, url: string)
    {
        const payload: PrintifyImageUploadRequestPayload = {
            file_name: fileName,
            url
        }

        const response = await this.client.post<PrintifyImageUploadRequestPayload, PrintifyImageResource>("uploads/images.json", payload) // set base url in client, and then fix this call add payload"
        console.log(response);
        return response;
    }

}

export default PrintifyRepository;