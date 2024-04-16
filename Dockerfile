# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies for both backend and frontend
RUN npm install --omit=dev

# Add the missing Babel plugin
RUN npm install @babel/plugin-proposal-private-property-in-object

# Copy the rest of the application files to the working directory
COPY . /app

# Build the React application
RUN npm run build

# Expose the port on which the backend app will run
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start:backend"]