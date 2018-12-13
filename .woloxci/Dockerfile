FROM node:8.9.4

WORKDIR /usr/src/app

ENV NODE_ENV development

ENV HOME /usr/src/app

RUN mkdir -p /install

ENV NODE_PATH=/install/node_modules

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /install/

WORKDIR /install

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

WORKDIR /usr/src/app

# Bundle app source
COPY . .
