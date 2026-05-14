FROM node:20-alpine

WORKDIR /app

COPY services/signaling-service/package.json .
RUN npm install

COPY services/signaling-service/tsconfig.json .
COPY tsconfig.base.json .

COPY services/signaling-service/src ./src

CMD ["npm","run","start"]