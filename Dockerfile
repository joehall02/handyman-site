# Use a node image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Set the working directory to the backend folder
WORKDIR /app/backend

# Copy the package.json and package-lock.json files of the backend to the working directory
COPY backend/package*.json ./

# Install the dependencies of the backend
RUN npm install

# Set the working directory to the root folder
WORKDIR /app

# Copy the rest of the files to the working directory
COPY . .

# Expose the port the app runs on (5050)
EXPOSE 5050

# Build the frontend React app
RUN npm run build

# Start the Express server and make sure it serves on port 5050
CMD ["node", "backend/server.js"]
