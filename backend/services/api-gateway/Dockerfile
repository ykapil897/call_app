FROM node:20-alpine

WORKDIR /app

COPY services/base-service/package.json .
RUN npm install

COPY services/base-service/tsconfig.json .
COPY tsconfig.base.json .

COPY services/base-service/src ./src

CMD ["npm","run","start"]