variable "aws_region" {
  description = "AWS Region"
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nom du projet"
  default     = "mon-ecommerce"
}

variable "db_username" {
  description = "Username base de données"
  default     = "ecommerceuser"
}

variable "db_password" {
  description = "Password base de données"
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT Secret"
  sensitive   = true
}

variable "database_url" {
  description = "URL de connexion à la base de données Neon"
  sensitive   = true
}