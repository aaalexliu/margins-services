
variable "www_domain_name" {
  default = "www.margins.me"
}

variable "root_domain_name" {
  default = "margins.me"
}

resource "aws_s3_bucket" "prod" {
  bucket = var.www_domain_name
  acl    = "public-read"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${var.www_domain_name}/*"
            ]
        }
    ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "error.html"

  }
  force_destroy = true
}

# resource "aws_s3_bucket_object" "prod" {
#   acl          = "public-read"
#   key          = "index.html"
#   bucket       = aws_s3_bucket.prod.id
#   content      = file("${path.module}/../assets/index.html")
#   content_type = "text/html"

# }

// Use the AWS Certificate Manager to create an SSL cert for our domain.
// This resource won't be created until you receive the email verifying you
// own the domain and you click on the confirmation link.
resource "aws_acm_certificate" "certificate" {
  // We want a wildcard cert so we can host subdomains later.
  domain_name       = "*.${var.root_domain_name}"
  validation_method = "DNS"

  // We also want the cert to be valid for the root domain even though we'll be
  // redirecting to the www. domain immediately.
  subject_alternative_names = ["${var.root_domain_name}"]
}