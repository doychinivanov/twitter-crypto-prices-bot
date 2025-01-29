FROM node:22.13.1-alpine

WORKDIR /src

COPY ./dist /src

COPY ./node_modules /node_modules

COPY .env ./

CMD ["node", "index.js"]
