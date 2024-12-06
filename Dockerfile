# Use the official Node.js 20.14.0 image as the base
FROM node:20.14.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application for production
RUN npm run build

# Install a lightweight HTTP server to serve the app
RUN npm install -g serve

# Set the environment variable to production
# ENV NODE_ENV production

# Expose port 3000 to the outside world
EXPOSE 3001

# Start the application using 'serve' on port 3000
CMD ["serve", "-s", "dist", "-l", "3001"]
