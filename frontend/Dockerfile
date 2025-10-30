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

# Expose Vite dev server port
EXPOSE 5173

# Start frontend in dev mode with host access
CMD ["npm", "run", "dev", "--", "--host"]
