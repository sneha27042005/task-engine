# Use Node.js 20 Alpine
FROM node:20-alpine

# Application directory
WORKDIR /app

# Copy dependency files first for Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Application port
EXPOSE 3000

# Start application
CMD ["npm", "start"]