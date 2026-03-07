FROM node:20-alpine

WORKDIR /app

COPY services/auth-service/package.json .
RUN npm install

COPY services/auth-service/tsconfig.json .
COPY tsconfig.base.json .

COPY services/auth-service/src ./src

CMD ["npm","run","start"]