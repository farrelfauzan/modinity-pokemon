FROM node:alpine as builder
WORKDIR /app

COPY package*.json ./

RUN yarn
RUN yarn add sharp --ignore-engines

COPY . .

RUN yarn build

FROM node:alpine as runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

ARG APP_PORT=8787
ENV PORT=${APP_PORT}
EXPOSE ${PORT}

CMD [ "yarn", "start:prod" ]