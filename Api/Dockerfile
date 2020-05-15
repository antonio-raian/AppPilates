FROM node:lts-alpine

WORKDIR . /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN yarn global add @adonisjs/cli nodemon

COPY . .

CMD [ "adonis", "serve" ]