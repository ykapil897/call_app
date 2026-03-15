FROM node:20-alpine

WORKDIR /app

COPY services/billing-service/package.json .
RUN npm install

COPY services/billing-service/tsconfig.json .
COPY tsconfig.base.json .

COPY services/billing-service/src ./src

CMD ["npm","run","start"]