
resource "aws_apigatewayv2_api" "http-api" {
  name = "margins-me-http-api"
  protocol_type = "HTTP"
}

data "aws_ssm_parameter" "audience" {
  name = "/margins.me/dev/auth/user-pool-client-arn"
}

data "aws_ssm_parameter" "issuer_endpoint" {
  name = "/margins.me/dev/auth/user-pool-endpoint"
}

resource "aws_apigatewayv2_authorizer" "jwt" {
  api_id = aws_apigatewayv2_api.http-api.id
  authorizer_type = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name = "cognito-jwt-authorizer"

  jwt_configuration {
    audience = ["${data.aws_ssm_parameter.audience}"]
    issuer = 
  }
}

data "aws_acm_certificate" "subdomains" {
  domain = "*.margins.me"
  statuses = ["ISSUED"]
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = "api.margins.me"

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.subdomains
    endpoint_type = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

