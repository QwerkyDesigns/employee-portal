import moveFile from '../s3Core/moveFile';
import { imageStoreBucket } from './imageStoreConstants';

export async function moveFileFromThisUncategorizedContainerTo(targetBucket: string, targetKey: string) {
    await moveFile(imageStoreBucket, targetKey, targetBucket, targetKey);
}
