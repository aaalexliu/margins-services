provider "aws" {
  region = "us-east-1"
}

module "aws_s3_uploads" {
  source = "./terraform-uploads/"

  bucket_prefix = "margins-me-uploads-dev"
}

module "aws_cognito_auth" {
  source = "./terraform-auth"
  user_pool_name = "margins-me-user-pool-dev"
  email_configuration_source_arn = "arn:aws:ses:us-east-1:516851544810:identity/hello@margins.me"
  clients =  [
    {
      name = "test1"
      generate_secret = false
      explicit_auth_flows = ["ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
    }
  ]
  cognito_user_pool_tags = {
    Environment = "test"
    Terraform = true
  }

  s3_bucket_arn = "${module.aws_s3_uploads.this_s3_bucket_arn}"

  api_gateway_id = "s5sgkhqtp5"
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