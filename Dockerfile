# docker image build -t api-soq . --no-cache
FROM node:19-alpine as img-soq-front

WORKDIR /app

COPY ./package*.json ./
RUN yarn

RUN yarn build

COPY ./ /app/

EXPOSE 8080
CMD [ "yarn","start" ]