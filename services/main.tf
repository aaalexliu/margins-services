provider {
  region = "us-east-1"
}

module "aws_s3_uploads_dev" {
  source = "./terraform-uploads/"
}