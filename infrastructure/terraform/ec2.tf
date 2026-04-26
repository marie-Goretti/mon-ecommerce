# AMI Amazon Linux 2
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Key pair SSH
resource "aws_key_pair" "main" {
  key_name   = "${var.project_name}-key"
  public_key = file("${path.module}/ec2-key.pub")
}

# IAM Role pour EC2 (accès ECR)
resource "aws_iam_role" "ec2" {
  name = "${var.project_name}-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_ecr" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2" {
  name = "${var.project_name}-ec2-profile"
  role = aws_iam_role.ec2.name
}

# Instance EC2
resource "aws_instance" "main" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.public[0].id
  vpc_security_group_ids      = [aws_security_group.ec2.id]
  key_name                    = aws_key_pair.main.key_name
  iam_instance_profile        = aws_iam_instance_profile.ec2.name
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install -y docker
    service docker start
    usermod -a -G docker ec2-user

    # Docker Compose
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose

    # Login ECR
    aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${aws_ecr_repository.backend.repository_url}

    # docker-compose.yml
    cat > /home/ec2-user/docker-compose.yml << 'COMPOSE'
services:
  backend:
    image: ${aws_ecr_repository.backend.repository_url}:latest
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - DATABASE_URL=${var.database_url}
      - JWT_SECRET=${var.jwt_secret}
    restart: unless-stopped

  frontend:
    image: ${aws_ecr_repository.frontend.repository_url}:latest
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
COMPOSE

    cd /home/ec2-user
    docker-compose up -d
  EOF

  tags = {
    Name    = "${var.project_name}-ec2"
    Project = var.project_name
  }
}

# Elastic IP
resource "aws_eip" "main" {
  instance = aws_instance.main.id
  domain   = "vpc"

  tags = {
    Name    = "${var.project_name}-eip"
    Project = var.project_name
  }
}

# Outputs
output "ec2_public_ip" {
  value = aws_eip.main.public_ip
}

output "app_url" {
  value = "http://${aws_eip.main.public_ip}"
}

output "backend_url" {
  value = "http://${aws_eip.main.public_ip}:5000/api/health"
}