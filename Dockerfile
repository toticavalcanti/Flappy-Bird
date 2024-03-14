FROM node:18-alpine

WORKDIR /App

# Expose port 3000 for the application
EXPOSE 3000

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Set the Node.js heap size limit to a higher value
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install the latest version of npm, clean npm cache, remove package-lock.json, and install production dependencies
RUN npm install -g npm@latest && \
    npm cache clean --force && \
    rm -f package-lock.json && \
    npm install --omit=dev

# Clean up the NODE_OPTIONS environment variable if not needed afterwards
# ENV NODE_OPTIONS=

# Now, copy the rest of the application files
COPY . .

# Build the application (if your application needs a build step)
RUN npm run build

# Command to start the application
CMD ["npm", "start"]
