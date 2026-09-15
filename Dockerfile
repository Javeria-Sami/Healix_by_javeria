# ==============================================================================
# Stage 1: Build Frontend Assets
# ==============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root manifests and workspace configs
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install dependencies deterministically
RUN npm ci

# Copy source files
COPY client/ ./client/
COPY server/ ./server/

# Build client production bundle
RUN npm run build --workspace=client

# ==============================================================================
# Stage 2: Production Web Server (Nginx)
# ==============================================================================
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/client/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
