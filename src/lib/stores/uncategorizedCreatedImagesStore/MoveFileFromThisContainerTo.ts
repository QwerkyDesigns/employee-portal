import moveFile from '../s3Core/moveFile';
import { imageStoreBucket } from './imageStoreConstants';

export async function MoveFileFromThisUncategorizedContainerTo(targetBucket: string, targetKey: string) {
    await moveFile(imageStoreBucket, targetKey, targetBucket, targetKey);
}
