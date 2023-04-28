resource "random_id" "rand" {
  byte_length = 3
}

locals {

  database_name = "qwerkystudio-${lower(var.environment)}-${random_id.rand.hex}"
  vpc_cidr      = "10.10.0.0/16"
  tags = {
    Product = "QwerkyStudio"
  }
}

# VPC
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "4.0.1"

  name = "qs-vpc-${random_id.rand.hex}-${lower(var.environment)}"
  cidr = local.vpc_cidr

  azs = ["${var.aws_region}a", "${var.aws_region}b"]
  public_subnets = [
    cidrsubnet(local.vpc_cidr, 8, 0),
    cidrsubnet(local.vpc_cidr, 8, 1)
  ]
  private_subnets = [
    cidrsubnet(local.vpc_cidr, 8, 2),
    cidrsubnet(local.vpc_cidr, 8, 3)
  ]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true
  tags                 = local.tags
}


# DATABASE
resource "aws_security_group" "db" {
  name        = "secg-db-https-${local.database_name}"
  description = "Allow incoming traffic from the load balancer to the nginx port for the server"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_db_subnet_group" "database" {
  description = "RDS subnet group for ${local.database_name}"
  name        = "qwerkystudio-rds-sgroup-${lower(var.environment)}-${random_id.rand.hex}"
  subnet_ids  = module.vpc.public_subnets
}

resource "aws_db_parameter_group" "database" {
  name   = "qwerkystudio-rds-pgroup-${lower(var.environment)}-${random_id.rand.hex}"
  family = "postgres13"

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

resource "aws_db_instance" "database" {
  identifier                            = local.database_name
  instance_class                        = var.db_instance_class
  username                              = "qwerkystudio"
  password                              = var.database_password
  vpc_security_group_ids                = [aws_security_group.db.id]
  deletion_protection                   = false # TODO: set to true in prod
  availability_zone                     = "${var.aws_region}a"
  allocated_storage                     = 10
  engine                                = "postgres"
  engine_version                        = "13.4"
  db_subnet_group_name                  = aws_db_subnet_group.database.name
  parameter_group_name                  = aws_db_parameter_group.database.name
  publicly_accessible                   = false
  skip_final_snapshot                   = true
  auto_minor_version_upgrade            = "true"
  iops                                  = 0
  backup_window                         = "07:44-08:14"
  maintenance_window                    = "sun:04:40-sun:05:10"
  max_allocated_storage                 = 1000
  performance_insights_enabled          = true
  performance_insights_retention_period = 7
  port                                  = 5420
  storage_encrypted                     = false
  tags                                  = local.tags
}


#  S3 BUCKETs
resource "aws_s3_bucket" "images" {
  bucket        = "qwerky-all-images-${var.environment}"
  force_destroy = "false"
  grant {
    id          = "1db2ccca6338f55bdbf819083cdc61ff572716bf2cbbcc6299f32a0dfd3faed9"
    permissions = ["FULL_CONTROL"]
    type        = "CanonicalUser"
  }
  object_lock_enabled = "false"
  request_payer       = "BucketOwner"
  tags                = local.tags
  tags_all = {
    Product = "QwerkyStudio"
  }

  versioning {
    enabled    = "true"
    mfa_delete = "false"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "images_encryption" {
  bucket = aws_s3_bucket.images.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = "true"
  }
}
