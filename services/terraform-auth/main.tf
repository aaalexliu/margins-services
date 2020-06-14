
provider "aws" {
  region = "us-east-1"
}

module "cognito-user-pool" {
  source  = "lgallard/cognito-user-pool/aws"
  version = "0.4.0"
  # insert the 24 required variables here

  user_pool_name = "margins-me-user-pool"
  alias_attributes = ["email"]
  auto_verified_attributes = ["email"]

  password_policy = {
    minimum_length = 8
    require_lowercase = false
    require_numbers = false
    require_symbols = false
    require_uppercase = false
    temporary_password_validity_days = 7
  }

  email_configuration = {
    email_sending_account = "DEVELOPER"
    source_arn = "arn:aws:ses:us-east-1:516851544810:identity/hello@margins.me"
  }

  # additional prices apply, so screw it
  # user_pool_add_ons = {
  #   advanced_security_mode = "AUDIT"
  # }

  verification_message_template = {
    default_email_option = "CONFIRM_WITH_LINK"
  }

  schemas = [
    {
      attribute_data_type      = "Boolean"
      developer_only_attribute = false
      mutable                  = true
      name                     = "registered"
      required                 = false
    },
  ]

  clients = [
    {
      name = "test1"
      generate_secret = false
      explicit_auth_flows = ["ADMIN_USER_PASSWORD_AUTH"]
    }
  ]

  user_groups = [
    {
      name = "admins"
    },
    {
      name = "users"
    },
    {
      name = "test"
    },
  ]

  tags = {
    Environment = "test"
    Terraform = true
  }
}