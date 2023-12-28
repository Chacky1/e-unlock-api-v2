# Use node 20 as base image for the build stage
FROM node:20 as builder

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

# Build the application
RUN pnpm build


# Use node 20 as base image for the production stage
FROM node:20

# Install pnpm as default package manager
RUN npm install -g pnpm

# Default working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml in the container
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using pnpm with frozen-lockfile option (for reproducible builds) and production flag
RUN pnpm install --frozen-lockfile --prod

# Copy the build folder from the build stage to the production stage
COPY --from=builder /usr/src/app/build ./build

# Expose port 3333
EXPOSE 3333

# Start the application
CMD ["node", "build/server.js"]
