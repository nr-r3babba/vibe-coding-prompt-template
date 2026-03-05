#!/bin/bash
# ===========================================
# Bronte AI Sales Agent — n8n AWS Deployment
# ===========================================
#
# This script runs ON the EC2 instance after you SSH in.
# It installs n8n with Docker, nginx reverse proxy, and SSL.
#
# PREREQUISITES (do these in AWS Console first):
#
# 1. Launch EC2 instance:
#    - Region: ap-southeast-2 (Sydney)
#    - AMI: Amazon Linux 2023 (or Ubuntu 22.04)
#    - Instance type: t3.small
#    - Storage: 20GB gp3
#    - Security Group: allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
#    - Key pair: create or use existing .pem file
#
# 2. Allocate an Elastic IP and associate it with your instance
#
# 3. Point a domain/subdomain to that Elastic IP:
#    e.g., n8n.bronte.ai → your Elastic IP
#    (Or use the raw IP with a self-signed cert for testing)
#
# 4. SSH into your instance:
#    ssh -i your-key.pem ec2-user@your-elastic-ip
#
# 5. Copy this script to the instance and run it:
#    chmod +x deploy-n8n-aws.sh
#    sudo ./deploy-n8n-aws.sh
#
# ===========================================

set -e

# --- CONFIGURE THESE ---
N8N_DOMAIN="${N8N_DOMAIN:-n8n.yourdomain.com}"
N8N_PORT=5678
TIMEZONE="Australia/Sydney"

echo "=== Installing Docker ==="
if command -v dnf &> /dev/null; then
  # Amazon Linux 2023
  dnf update -y
  dnf install -y docker git
  systemctl enable docker
  systemctl start docker
elif command -v apt-get &> /dev/null; then
  # Ubuntu
  apt-get update -y
  apt-get install -y docker.io docker-compose git
  systemctl enable docker
  systemctl start docker
fi

echo "=== Installing Docker Compose ==="
if ! command -v docker-compose &> /dev/null; then
  curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi

echo "=== Creating n8n directory ==="
mkdir -p /opt/n8n
cd /opt/n8n

echo "=== Creating docker-compose.yml ==="
cat > docker-compose.yml << 'COMPOSE'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=${N8N_DOMAIN}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${N8N_DOMAIN}/
      - GENERIC_TIMEZONE=${TIMEZONE}
      - TZ=${TIMEZONE}
      # Basic auth for n8n UI
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER:-admin}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD:-changeme}
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
COMPOSE

echo "=== Creating .env file ==="
cat > .env << ENV
N8N_DOMAIN=${N8N_DOMAIN}
TIMEZONE=${TIMEZONE}
N8N_USER=admin
N8N_PASSWORD=changeme_to_something_secure
ENV

echo "=== Installing nginx for reverse proxy ==="
if command -v dnf &> /dev/null; then
  dnf install -y nginx
elif command -v apt-get &> /dev/null; then
  apt-get install -y nginx
fi

echo "=== Configuring nginx ==="
cat > /etc/nginx/conf.d/n8n.conf << NGINX
server {
    listen 80;
    server_name ${N8N_DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:5678;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
}
NGINX

systemctl enable nginx
systemctl restart nginx

echo "=== Starting n8n ==="
cd /opt/n8n
docker-compose up -d

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo ""
echo "n8n is running at: http://${N8N_DOMAIN}"
echo ""
echo "NEXT STEPS:"
echo "  1. Install SSL with certbot:"
echo "     sudo dnf install -y certbot python3-certbot-nginx  # Amazon Linux"
echo "     sudo apt install -y certbot python3-certbot-nginx  # Ubuntu"
echo "     sudo certbot --nginx -d ${N8N_DOMAIN}"
echo ""
echo "  2. Change the n8n password in /opt/n8n/.env"
echo "     Then restart: cd /opt/n8n && docker-compose down && docker-compose up -d"
echo ""
echo "  3. In n8n UI, add HubSpot credential:"
echo "     Settings → Credentials → Add → HubSpot App Token"
echo "     Paste your HUBSPOT_API_TOKEN"
echo ""
echo "  4. Add Anthropic (Claude) credential:"
echo "     Settings → Credentials → Add → Anthropic"
echo "     Paste your ANTHROPIC_API_KEY"
echo ""
