# Stage 1 : Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Stage 2 : Runtime
FROM node:18-alpine AS runtime

# Sécurité : utilisateur non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

WORKDIR /app

# Copier les dépendances depuis le stage build
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules

# Copier le code source
COPY --chown=nodeuser:nodejs . .

USER nodeuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["node", "src/index.js"]