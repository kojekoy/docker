FROM node:8
RUN apt-get update && apt-get -y install cron 
RUN mkdir /tes 
ADD package.json /tes
WORKDIR /tes
RUN  npm install
COPY . .
EXPOSE 3000
CMD node app.js

