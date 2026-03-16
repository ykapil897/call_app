FROM node:20-alpine

WORKDIR /app

COPY services/event-bus/package.json ./
RUN npm install

COPY services/event-bus/tsconfig.json ./
COPY tsconfig.base.json ./

COPY services/event-bus/src ./src

CMD ["npm","run","start"]