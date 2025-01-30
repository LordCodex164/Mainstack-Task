FROM node:18 as base

WORKDIR /user/node/server

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

RUN npm run build

CMD ["npx", "nodemon", "--exec", "ts-node", "--transpile-only", "./src/server.ts"]