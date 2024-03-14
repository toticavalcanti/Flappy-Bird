FROM node:18-alpine

WORKDIR /App

# Expose port 3000 for the application
EXPOSE 3000

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the latest version of npm to ensure consistency with package-lock.json handling,
# clean npm cache to avoid any cached packages interfering,
# remove the package-lock.json if it exists, and
# install only the production dependencies.
RUN npm install -g npm@latest && \
    npm cache clean --force && \
    rm -f package-lock.json && \
    npm install --omit=dev

# Now, copy the rest of the application files
COPY . .

# Build the application (if your application needs a build step)
# This step can be removed or commented out if your application does not need a compilation step
RUN npm run build

# Command to start the application
CMD ["npm", "start"]
