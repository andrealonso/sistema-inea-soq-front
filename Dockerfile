# docker image build -t api-soq . --no-cache
FROM node:19-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

RUN yarn build

RUN rm -rf node_modules && \
    NODE_ENV=production yarn install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

FROM node:19-alpine

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 8080

CMD [ "yarn", "start" ]