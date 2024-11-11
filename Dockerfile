FROM node:22
LABEL authors="eto_ne_ananasbi95"

WORKDIR /json-server
COPY ./public/DB.json ./DB.json

RUN npm i  -G json-server

EXPOSE 3000:3000

ENTRYPOINT ["npx", "json-server", "--watch", "/json-server/DB.json", "--port", "3000"]