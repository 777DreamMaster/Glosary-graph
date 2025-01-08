# Dockerfile for Frontend
FROM node:slim AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./package.json

# Install dependencies
RUN npm install

# Copy application code
COPY src ./src
COPY index.html ./index.html
COPY vite.config.js ./vite.config.js

# Build the application
RUN npm run build

# Use a lightweight image for serving the app
FROM node:slim

# Set working directory
WORKDIR /usr/src/app

# Copy build files from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose the port the app runs on
EXPOSE 5000

# Start the Vite development server
CMD ["npm", "run", "front"]
