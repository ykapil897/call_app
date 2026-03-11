FROM node:20-alpine

WORKDIR /app

COPY services/call-state-manager/package.json .
RUN npm install

COPY services/call-state-manager/tsconfig.json .
COPY tsconfig.base.json .

COPY services/call-state-manager/src ./src

CMD ["npm","run","start"]