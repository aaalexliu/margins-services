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
resource "aws_security_group" "public" {
  name        = "margins-public"
  description = "margins public facing security group"
  vpc_id      = aws_vpc.vpc.id

  # Allow outbound internet access.
  egress = [{
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    # below is because terraform is throwin errors saying these attributes
    # are required when they're not (as per docs).
    description = null
    ipv6_cidr_blocks = null
    prefix_list_ids = null
    security_groups = null
    self = null
  }]

  ingress = [
    {
      cidr_blocks = [ "0.0.0.0/0" ]
      description = "open port for ssh"
      from_port = 22
      protocol = "tcp"
      to_port = 22
      ipv6_cidr_blocks = null
      prefix_list_ids = null
      security_groups = null
      self = null
    },
    {
      cidr_blocks = [ "0.0.0.0/0" ]
      description = "open port for http"
      from_port = 80
      protocol = "tcp"
      to_port = 80
      ipv6_cidr_blocks = null
      prefix_list_ids = null
      security_groups = null
      self = null
    }
  ]

  tags = {
    Name = "margins-public-security-group"
  }
}