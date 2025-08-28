FROM node:20

WORKDIR /app

COPY package*.json ./
COPY . .

RUN yarn install && yarn build

EXPOSE 3000

CMD ["node", "dist/main"]