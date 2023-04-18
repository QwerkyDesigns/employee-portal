# resource "aws_db_instance" "postgres" {
#   allocated_storage    = 10
#   engine               = "postgres"
#   engine_version       = "11.5"
#   instance_class       = "db.t2.micro"
#   name                 = "studio-portal-${lower(var.environment)}"
#   username             = "postgres"
#   password             = "xkcdyfgahb234"
#   skip_final_snapshot  = true
# }

# resource "aws_security_group" "postgres" {
#   name        = "studio-portal-db-${lower(var.environment)}"
#   description = "Security group for PostgreSQL RDS instance"

#   ingress {
#     from_port   = 5432
#     to_port     = 5432
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name = "studio-portal"
#   }
# }

# output "database_url" {
#   value = "postgresql://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}?sslmode=require"
# }
