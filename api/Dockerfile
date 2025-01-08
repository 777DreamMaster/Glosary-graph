FROM node:slim

WORKDIR /usr/src/app

COPY package.json ./package.json

RUN npm install

COPY src ./src

VOLUME ["/usr/src/app/data"]

EXPOSE 3000

CMD ["node", "src/server.js"]
