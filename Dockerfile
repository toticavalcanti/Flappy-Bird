FROM node:18-alpine

WORKDIR /App

# Expose port 3000 for the application
EXPOSE 3000

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the latest version of npm to ensure consistency with package-lock.json handling
RUN npm install -g npm@latest

# Clean npm cache to avoid any cached packages interfering
RUN npm cache clean --force

# Install project dependencies, ensuring to avoid installing devDependencies
# Note: We directly install dependencies instead of using `npm ci` here to bypass potential issues
# with package-lock.json discrepancies and to ensure that a fresh package-lock.json can be generated if needed
RUN npm install --only=production --loglevel verbose

# Now, copy the rest of the application files
COPY . .

# Build the application (if your application needs a build step)
RUN npm run build

# Command to start the application
CMD ["npm", "start"]
