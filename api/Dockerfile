FROM node:slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME ["/app/data"]

EXPOSE 3000

CMD ["node", "src/server.js"]
