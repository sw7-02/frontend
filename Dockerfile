# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:alpine3.17
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies
COPY package*.json ./
RUN npm i -D && npm cache clean --force

# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)

# Start the app
CMD [ "npx", "vite", "dev", "--host" ] #TODO: Would be nice if we could run with npx serve
