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

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "margins-private-1"
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"

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
    description      = null
    ipv6_cidr_blocks = null
    prefix_list_ids  = null
    security_groups  = null
    self             = null
  }]

  ingress = [
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = "open port for ssh"
      from_port        = 22
      protocol         = "tcp"
      to_port          = 22
      ipv6_cidr_blocks = null
      prefix_list_ids  = null
      security_groups  = null
      self             = null
    },
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = "open port for http"
      from_port        = 80
      protocol         = "tcp"
      to_port          = 80
      ipv6_cidr_blocks = null
      prefix_list_ids  = null
      security_groups  = null
      self             = null
    },
    {
      cidr_blocks      = ["0.0.0.0/0"]
      description      = "open port for https"
      from_port        = 443
      protocol         = "tcp"
      to_port          = 443
      ipv6_cidr_blocks = null
      prefix_list_ids  = null
      security_groups  = null
      self             = null
    }
  ]

  tags = {
    Name = "margins-public-security-group"
  }
}

resource "aws_security_group" "private" {
  name        = "margins-private"
  description = "margins private security group"
  vpc_id      = aws_vpc.vpc.id

  # only allows traffic from web server
  ingress = [{
    description      = "postgresql access"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    security_groups  = [aws_security_group.public.id]
    ipv6_cidr_blocks = null
    prefix_list_ids  = null
    cidr_blocks      = null
    self             = null
  }]

  # Allow all outbound traffic.
  egress = [{
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    # below is because terraform is throwin errors saying these attributes
    # are required when they're not (as per docs).
    description      = null
    ipv6_cidr_blocks = null
    prefix_list_ids  = null
    security_groups  = null
    self             = null
  }]
}

resource "aws_db_subnet_group" "default" {
  name       = "margins-db-subnet"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id]

  tags = {
    Name = "margins db subnet group"
  }
}

variable "database_password" {
  type = string
  sensitive = true
}
variable "database_user" {
  type = string
  sensitive = true
}
resource "aws_db_instance" "default" {
  identifier                = "margins-rds"
  allocated_storage         = 10
  engine                    = "postgres"
  engine_version            = "10.12"
  instance_class            = "db.t2.micro"
  name                      = "margins"
  username                  = var.database_user
  password                  = var.database_password
  db_subnet_group_name      = aws_db_subnet_group.default.id
  vpc_security_group_ids    = [aws_security_group.private.id]
}

resource "aws_key_pair" "deployer" {
  key_name = "deployer-key"
  public_key = file("~/.ssh/alex-ec2.pub")
}

resource "aws_instance" "web" {
  ami = "ami-0be2609ba883822ec"
  instance_type = "t2.micro"
  vpc_security_group_ids = [ aws_security_group.public.id ]
  subnet_id = aws_subnet.public.id
  associate_public_ip_address = true
  key_name = aws_key_pair.deployer.id
}