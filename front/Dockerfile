# Dockerfile for Frontend
FROM node:slim AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight image for serving the app
FROM node:slim

# Set working directory
WORKDIR /app

# Install dependencies required for serving (if necessary)
RUN npm install -g serve

# Copy build files from the builder stage
COPY --from=builder /app/dist /app/dist

# Expose the port the app runs on
EXPOSE 5000

# Start the app using `serve`
CMD ["serve", "-s", "dist", "-l", "5000"]
