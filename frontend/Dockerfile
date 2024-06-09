# Stage 1: Build the React app
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

#Copy the package json
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with NGINX
FROM nginx:latest

# Copy the built React app from the previous stage into the NGINX image
COPY --from=build /app/build /usr/share/nginx/html

# Copy NGINX configuration file
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]
