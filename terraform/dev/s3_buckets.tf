resource "aws_s3_bucket" "archived_images" {
  bucket        = "qd-archived-images-dev"
  force_destroy = "false"

  grant {
    id          = "1db2ccca6338f55bdbf819083cdc61ff572716bf2cbbcc6299f32a0dfd3faed9"
    permissions = ["FULL_CONTROL"]
    type        = "CanonicalUser"
  }

  object_lock_enabled = "false"
  request_payer       = "BucketOwner"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }

      bucket_key_enabled = "true"
    }
  }

  tags = {
    Product = "QwerkyDesigns"
  }

  tags_all = {
    Product = "QwerkyDesigns"
  }

  versioning {
    enabled    = "true"
    mfa_delete = "false"
  }
}

resource "aws_s3_bucket" "uploads_and_transfers" {
  bucket = "qd-uploads-and-transfers-dev"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = ["*"]
    max_age_seconds = "0"
  }

  force_destroy = "false"

  grant {
    id          = "1db2ccca6338f55bdbf819083cdc61ff572716bf2cbbcc6299f32a0dfd3faed9"
    permissions = ["FULL_CONTROL"]
    type        = "CanonicalUser"
  }

  object_lock_enabled = "false"
  request_payer       = "BucketOwner"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }

      bucket_key_enabled = "true"
    }
  }

  tags = {
    Product = "QwerkyDesigns"
  }

  tags_all = {
    Product = "QwerkyDesigns"
  }

  versioning {
    enabled    = "true"
    mfa_delete = "false"
  }
}


resource "aws_s3_bucket" "categorized_images" {
  bucket = "qd-categorized-images-dev"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = ["*"]
    max_age_seconds = "0"
  }

  force_destroy = "false"

  grant {
    id          = "1db2ccca6338f55bdbf819083cdc61ff572716bf2cbbcc6299f32a0dfd3faed9"
    permissions = ["FULL_CONTROL"]
    type        = "CanonicalUser"
  }

  object_lock_enabled = "false"
  request_payer       = "BucketOwner"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }

      bucket_key_enabled = "true"
    }
  }

  tags = {
    Product = "QwerkyyDesigns"
  }

  tags_all = {
    Product = "QwerkyDesigns"
  }

  versioning {
    enabled    = "true"
    mfa_delete = "false"
  }
}