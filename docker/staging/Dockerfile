# Use node 20 as base image for the staging environment
FROM node:20

# Install pnpm as default package manager
RUN npm install -g pnpm

# Default working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml in the container
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using pnpm with frozen-lockfile option (for reproducible builds)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application in the container
COPY . .

# Expose port 3333
EXPOSE 3333

# Start the application
CMD ["sh", "-c", "pnpm build && pnpm start"]
