


resource "aws_db_instance" "postgres" {
  allocated_storage    = 10
  engine               = "postgres"
  engine_version       = "11.5"
  instance_class       = "db.t2.micro"
  name                 = "studio-portal-${lower(var.environment)}"
  username             = "postgres"
  password             = "xkcdyfgahb234"
  skip_final_snapshot  = true
}

resource "aws_security_group" "postgres" {
  name        = "studio-portal-db-${lower(var.environment)}"
  description = "Security group for PostgreSQL RDS instance"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "studio-portal"
  }
}

resource "aws_amplify_app" "app" {
  name = "studio-portal-ui-${lower(var.environment)}"

  custom_rule {
    source = "https://example.com"
    status = "302"
    target = "https://www.example.com"
  }
}

resource "aws_amplify_branch" "main" {
  app_id  = aws_amplify_app.app.app_id
  branch_name = "main"
  framework = "React"
  stage     = var.environment
}

resource "aws_amplify_app_environment_variable" "postgres" {
  app_id  = aws_amplify_app.app.app_id
  name    = "DATABASE_URL"
  value   = "postgresql://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}?sslmode=require"
}


resource "aws_amplify_domain_association" "qwerky.studio" {
  app_id      = aws_amplify_app.app.app_id
  domain_name = "qwerky.studio"

  # https://qwerky.studio
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # https://www.qwerky.studio
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}

output "database_url" {
  value = "postgresql://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}?sslmode=require"
}