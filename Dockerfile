# Builder stage
FROM node:16-alpine AS builder

# Add a work directory
WORKDIR /app

# Copy package files and install dependencies
COPY .pnpmrc package.json pnpm-lock.yaml ./

# Install lastest pnpm & package
RUN npm install -g pnpm && pnpm install --ignore-scripts

# Copy app files
COPY . .

# Build the app
RUN pnpm build

# Production stage
FROM nginx:alpine-slim as production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy SSL Key and cert and SSL config
COPY nginx/https_nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/ssl/self-signed-ssl-cert.crt /etc/nginx/ssl/self-signed-ssl-cert.crt
COPY nginx/ssl/self-signed-ssl-key.key /etc/nginx/ssl/self-signed-ssl-key.key

# Expose port for HTTP
EXPOSE 80

# Expose port for HTTPS
EXPOSE 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
