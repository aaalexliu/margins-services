
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
    audience = ["${data.aws_ssm_parameter.audience.value}"]
    issuer = "https://${data.aws_ssm_parameter.issuer_endpoint.value}"
  }
}

data "aws_acm_certificate" "subdomains" {
  domain = "*.margins.me"
  statuses = ["ISSUED"]
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = "api.margins.me"

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.subdomains.arn
    endpoint_type = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id = aws_apigatewayv2_api.http-api.id
  name = "$default"
}

resource "aws_apigatewayv2_api_mapping" "api" {
  api_id = aws_apigatewayv2_api.http-api.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage = aws_apigatewayv2_stage.default.id
}

resource "aws_cloudformation_stack" "api-ssm-parameters" {
  name = "api-ssm-parameters"

  template_body = <<STACK
    Resources:
      HttpApiId:
        Type: AWS::SSM::Parameter
        Properties:
          Name: /margins.me/dev/api/api-id
          Type: String
          Value: "${aws_apigatewayv2_api.http-api.id}"
      ApiAuthorizerId:
        Type: AWS::SSM::Parameter
        Properties:
          Name: /margins.me/dev/api/authorizer-id
          Type: String
          Value: "${aws_apigatewayv2_authorizer.jwt.id}"
  STACK
}