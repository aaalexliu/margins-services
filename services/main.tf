provider "aws" {
  region = "us-east-1"
}

module "aws_s3_uploads" {
  source = "./terraform-uploads/"

  bucket_prefix = "margins-me-uploads-dev"
}

output "s3_bucket_id" {
  value = "${module.aws_s3_uploads.this_s3_bucket_id}"
}

output "s3_bucket_arn" {
  value = "${module.aws_s3_uploads.this_s3_bucket_arn}"
}

output "s3_bucket_domain_name" {
  value = "${module.aws_s3_uploads.this_s3_bucket_bucket_domain_name}"
}