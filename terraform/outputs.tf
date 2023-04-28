output "image_bucket" {
  value = "${aws_s3_bucket.images.id}"
}

output "database_url" {
  value = aws_db_instance.database.endpoint
}
