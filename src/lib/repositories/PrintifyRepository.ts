import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { EnvironmentVariable } from "../environment/EnvironmentVariable";

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
const BASE_URL = "https://api.printify.com/v1";

const CONFIG: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${EnvironmentVariable.PrintifyApiKey}`,
    },
    baseURL: BASE_URL,
};

class PrintifyRepository {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create(CONFIG);
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
