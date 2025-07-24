# Use Node.js LTS as base image
FROM node:18

# Set working directory
WORKDIR /..

# Copy package files and install dependencies then remove unneccessary dependencies
COPY /../package*.json ./
RUN rm -rf node_modules
RUN npm install -g
RUN npm prune

# Copy the service source code
COPY . .

# Build the NestJS project 
RUN npm run build

# Expose the port your service listens on 
EXPOSE 3003

# Start the service
CMD ["npm", "run", "start:prod"]