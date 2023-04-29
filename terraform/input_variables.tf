variable "database_password" {
  type        = string
  description = "password to connect to the RDS postgres database - this is stored in Octopus and Lastpass"
  default     = "power_rangers587"
}

variable "db_instance_class" {
  description = "The type of instance that runs the database"
  type        = string
  default     = "db.t3.micro"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region for all resources. e.g. us-east-1"
  type        = string
  default     = "us-east-1"
}
