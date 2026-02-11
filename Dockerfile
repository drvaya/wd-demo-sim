FROM node:18-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Install dependencies
# Note: In a real app, we'd copy package.json first. 
# For this PoC, we assume we might bind mount or just copy everything.
# To make this standalone deployable, we'll assume a standard build.
# BUT, since we are scaffolding files one by one, we might not have a package.json yet.
# Let's create a minimal package.json if it doesn't execute validly exist, but for the Dockerfile
# we will assume standard Next.js output.

COPY package*.json ./
RUN npm install

COPY . .

# Build the app
RUN npm run build

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
