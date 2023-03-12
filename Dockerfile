#build stage

FROM node:16 as build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# prod stage

FROM node:16.0

WORKDIR /app

ARG NODE_ENV_PRODUCTION=production

ENV NODE_ENV=${NODE_ENV_PRODUCTION}

COPY --from=build /app/dist ./dist

COPY package*.json .

RUN npm install --only=production

EXPOSE 3000

CMD npm run start:prod