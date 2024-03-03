# Use the official Node.js image as a base
FROM node:18

# Install yarn globally
RUN npm install -g yarn

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]
