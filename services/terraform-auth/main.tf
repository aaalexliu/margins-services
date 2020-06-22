
module "cognito-user-pool" {
  source  = "lgallard/cognito-user-pool/aws"
  version = "0.4.0"
  # insert the 24 required variables here

  user_pool_name = var.user_pool_name
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
    email_sending_account = "COGNITO_DEFAULT"
    source_arn = var.email_configuration_source_arn
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

  clients = var.clients

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

  tags = var.cognito_user_pool_tags
}

resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "identity pool"
  allow_unauthenticated_identities = true
}


data "aws_iam_policy_document" "authenticated_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type = "Federated"
      identifiers = ["cognito-identity.amazonaws.com"]
    }
    
    condition {
      test = "StringEquals"
      variable = "cognito-identity.amazonaws.com:aud"
      values = [
        "&{aws_cognito_identity_pool.main.id}"
      ]
    }
  }
}

resource "aws_iam_role" "authenticated" {
  name = "cognito_authenticated"

  assume_role_policy = data.aws_iam_policy_document.authenticated_role.json
}

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "authenticated_role_policy" {
  statement {
    actions = [
      "mobileanalytics:PutEvents",
      "cognito-sync:*",
      "cognito-identity:*"
    ]
    resources = ["*"]
  }

  statement {
    actions = ["s3:*Object"]
    resources = ["${var.s3_bucket_arn}/private/$${cognito-identity.amazonaws.com:sub}/*"]
  }

  # Only needed for REST APIs
  # statement {
  #   actions = ["execute-api:Invoke"]
  #   resources = [
  #     "arn:aws:execute-api:us-east-1:${data.aws_caller_identity.current.account_id}:${var.api_gateway_id}/*"
  #   ]
  # }
}

output "aws_iam_authenticated_role_policy" {
  value = data.aws_iam_policy_document.authenticated_role_policy.json
}

resource "aws_iam_role_policy" "authenticated_role_policy" {
  name = "authenticated_policy"
  role = aws_iam_role.authenticated.id

  policy = data.aws_iam_policy_document.authenticated_role_policy.json
}

# resource "aws_cognito_identity_pool_roles_attachment" "main" {
#   identity_pool_id = "${aws_cognito_identity_pool.main.id}"

#   role_mapping {
#     identity_provider         = "graph.facebook.com"
#     ambiguous_role_resolution = "AuthenticatedRole"
#     type                      = "Rules"

#     mapping_rule {
#       claim      = "isAdmin"
#       match_type = "Equals"
#       role_arn   = "${aws_iam_role.authenticated.arn}"
#       value      = "paid"
#     }
#   }

#   roles = {
#     "authenticated" = "${aws_iam_role.authenticated.arn}"
#   }
# }