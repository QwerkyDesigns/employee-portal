output "image_bucket" {
  value = module.qwerkystudio_images_bucket.data_bucket_name
}

output "database_url" {
  value = aws_db_instance.database.endpoint
}
