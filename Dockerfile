FROM node:15-slim
MAINTAINER Felix Franz <www.felix-franz.com>

COPY ./ /app
WORKDIR /app
RUN bash npm install --production

EXPOSE 8080
CMD npm start