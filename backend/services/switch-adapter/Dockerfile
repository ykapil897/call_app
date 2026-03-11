FROM node:20-alpine

WORKDIR /app

COPY services/switch-adapter/package.json .
RUN npm install

COPY services/switch-adapter/tsconfig.json .
COPY tsconfig.base.json .

COPY services/switch-adapter/src ./src

CMD ["npm","run","start"]