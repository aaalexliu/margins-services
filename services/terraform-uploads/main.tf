provider "aws" {
  region = "us-east-1"
}

# module "s3-bucket" {
#   source  = "terraform-aws-modules/s3-bucket/aws"
#   version = "1.8.0"
#   # insert the 6 required variables here
# }

resource "aws_s3_bucket" "this" {
  # bucket = var.bucket
  bucket = "margins.me-uploads"

  # acl = "public-read-write"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}