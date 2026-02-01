# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . ./

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Install serve to run the app
RUN npm add -g serve

# Expose port
EXPOSE 8080

# Serve the application
CMD ["serve", "-s", "dist", "-l", "8080"]
