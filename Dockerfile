FROM node:boron

# Create app directory inside the image
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Define the port to bind
EXPOSE 8080

# Run
CMD ["npm", "start"]

