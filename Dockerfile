FROM node:15-slim
MAINTAINER Felix Franz <www.felix-franz.com>

RUN apt-get update \
  && apt-get install -y curl \
  && rm -rf /var/lib/apt/lists/*

COPY ./ /app
WORKDIR /app
RUN npm install --production

EXPOSE 8080
CMD npm start