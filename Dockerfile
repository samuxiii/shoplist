FROM node:boron

# Install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 \
  && echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list \
  && apt-get update \
  && apt-get install -y mongodb-org --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Initiatlize mongodb directory
RUN mkdir -p /data/db

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install app dependencies
COPY package.json /opt/app/
RUN npm install

# Bundle app source
COPY . /opt/app

# Define the port to bind
EXPOSE 9981

# Run
# Hint: docker is not oriented to run more than one process
#       per container. For this reason mongo and node are 
#       executed from the next bash script.
CMD ["bash", "docker-app-run.sh"]

