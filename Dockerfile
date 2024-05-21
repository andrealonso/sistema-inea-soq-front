# docker image build -t api-soq . --no-cache
FROM node:19-alpine as img-soq-api

WORKDIR /app

COPY ./package*.json ./
RUN yarn

COPY ./ /app/

EXPOSE 8080
CMD [ "yarn","start" ]