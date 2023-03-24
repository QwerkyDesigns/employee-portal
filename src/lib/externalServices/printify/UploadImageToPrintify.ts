import PrintifyError from '@/lib/errors/application-errors/PrintifyError';
import { AxiosInstance } from 'axios';

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

export default async function uploadImageToPrintify(fileName: string, url: string, printifyClient: AxiosInstance) {
    const payload: PrintifyImageUploadRequestPayload = {
        file_name: fileName,
        url
    };

    const response = await printifyClient.post<PrintifyImageUploadRequestPayload, PrintifyImageResource>('uploads/images.json', payload);
    if (response) {
        return response;
    }

    throw new PrintifyError('Failed to receive response from Printify');
}
