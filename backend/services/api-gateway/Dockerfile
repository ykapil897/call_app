FROM node:20-alpine

WORKDIR /app

COPY services/api-gateway/package.json .
RUN npm install

COPY services/api-gateway/tsconfig.json .
COPY tsconfig.base.json .

COPY services/api-gateway/src ./src

CMD ["npm","run","start"]