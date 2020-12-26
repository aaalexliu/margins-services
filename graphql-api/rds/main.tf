terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/21"

  tags = {
    Name = "margins-vpc"
  }
}

resource "aws_internet_gateway" "gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "margins-internet-gateway"
  }
}

resource "aws_route" "route" {
  route_table_id         = aws_vpc.vpc.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gateway.id
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"

  tags = {
    Name = "margins-public"
  }
}

resource "aws_subnet" "private-1" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"

  tags = {
    Name = "margins-private-1"
  }
}

resource "aws_subnet" "private-2" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"

  tags = {
    Name = "margins-private-2"
  }
}

# resource "aws_security_group" "default" {
#   name        = "terraform_security_group"
#   description = "Terraform example security group"
#   vpc_id      = aws_vpc.vpc.id

#   # Allow outbound internet access.
#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags {
#     Name = "terraform-example-security-group"
#   }
# }