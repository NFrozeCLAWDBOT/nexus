variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "nexus"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-2"
}

variable "bucket_name" {
  description = "S3 bucket name (must match domain for Cloudflare)"
  type        = string
  default     = "nfroze.co.uk"
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for nfroze.co.uk"
  type        = string
  default     = "cdccc75819418e12002199451b6bde4e"
}
