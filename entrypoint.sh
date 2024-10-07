#!/bin/sh

# Check if NODE_ENV is set to production
if [ "$NODE_ENV" = "production" ]; then
  echo "Running in production mode..."
  # Build the frontend React app and then run the backend server in production
  npm run build
  # Start the Express server and make sure it serves on port 5050
  node backend/server.js
else
  echo "Running in development mode..."
  # Start the development server
  npm start
fi