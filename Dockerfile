FROM node:18-alpine

WORKDIR /App

# Expose port 3000 for the application
EXPOSE 3000

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Set the Node.js heap size limit to a higher value (if needed)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install production dependencies with npm ci for consistency
RUN npm ci --omit=dev

# Now, copy the rest of the application files
COPY . .

# Build the application (if your application needs a build step)
RUN npm run build

# Command to start the application
CMD ["npm", "start"]