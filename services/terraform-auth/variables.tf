
variable "user_pool_name" {
  description = "The name of the user pool"
  type = string
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