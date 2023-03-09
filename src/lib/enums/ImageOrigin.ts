// The download bucket will look like
// - downloadBucket
// -- [imageSetId]
//    -- imageSetId-0.png
//    -- imageSetId-1.png
//    -- imageSetId-2.png
//    -- imageSetId-meta.txt
// -- [imageSetId]
//    -- imageSetId-0.png
//    -- imageSetId-1.png
//    -- imageSetId-2.png
//    -- imageSetId-meta.txt

export enum ImageOrigin {
  Dalle = 'Dall-E',
  Upload = 'Uploads',
}
