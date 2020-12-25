provider "aws" {
  region = "us-east-1"
}

# module "s3-bucket" {
#   source  = "terraform-aws-modules/s3-bucket/aws"
#   version = "1.8.0"
#   # insert the 6 required variables here
# }
data "aws_caller_identity" "current" {}

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

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "AllowSESPuts",
          "Effect": "Allow",
          "Principal": {
              "Service": "ses.amazonaws.com"
          },
          "Action": "s3:PutObject",
          "Resource": "arn:aws:s3:::margins.me-uploads/*",
          "Condition": {
              "StringEquals": {
                  "aws:Referer": ${data.aws_caller_identity.current.account_id}
              }
          }
      }
  ]
}
  POLICY
}