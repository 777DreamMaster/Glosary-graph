FROM node:slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:slim

WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/dist /app/dist

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]
