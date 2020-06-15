
variable "user_pool_name" {
  description = "The name of the user pool"
  type = string
  default = ""
}

variable "email_configuration_source_arn" {
  description = "The ARN of the email source"
  type        = string
  default     = ""
}

variable "clients" {
  description = "A container with the clients definitions"
  type        = list
  default     = []
}

variable "s3_bucket_arn" {
  description = "s3 bucket arn for uploads"
  type = string
  default = ""
}

variable "cognito_user_pool_tags" {
  description = "Tags for cognito user pool"
  type = object({
    Environment = string
    Terraform = bool 
  })
}
