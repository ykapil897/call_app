FROM node:20-alpine

WORKDIR /app

COPY services/session-service/package.json .
RUN npm install

COPY services/session-service/tsconfig.json .
COPY tsconfig.base.json .

COPY services/session-service/src ./src

CMD ["npm","run","start"]