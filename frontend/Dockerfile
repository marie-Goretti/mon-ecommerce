# Stage 1 : Build React
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build de production
RUN npm run build

# Stage 2 : Serveur Nginx pour servir le build
FROM nginx:alpine AS runtime

# Copier le build React vers Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Configuration Nginx pour React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]