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

# Expose the port the app runs on. Development (3000) and Production (5050)
EXPOSE 3000 5050

# Add an entrypoint script to manage behavior based on the NODE_ENV
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the default command to run the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

