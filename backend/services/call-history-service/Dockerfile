FROM node:20-alpine

WORKDIR /app

COPY services/call-history-service/package.json .
RUN npm install

COPY services/call-history-service/tsconfig.json .
COPY tsconfig.base.json .

COPY services/call-history-service/src ./src

CMD ["npm","run","start"]