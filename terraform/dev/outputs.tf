output "aws_s3_bucket_archived_images_id" {
  value = "${aws_s3_bucket.archived_images.id}"
}

output "aws_s3_bucket_uploads_and_transfers_id" {
  value = "${aws_s3_bucket.uploads_and_transfers.id}"
}

output "aws_s3_bucket_categorized_images" {
  value = "${aws_s3_bucket.categorized_images.id}"
}
