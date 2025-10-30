# Use Node.js 22.12 LTS Alpine
FROM node:22.12-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend in development
CMD ["npm", "run", "dev"]
