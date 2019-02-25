FROM node:carbon

WORKDIR /node-mp

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package* ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3050

CMD node index.js