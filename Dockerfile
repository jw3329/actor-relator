FROM node:alpine
WORKDIR /usr/src/app
ADD package.json package-lock.json ./
RUN npm install
ADD server/package.json server/package-lock.json ./server/
RUN cd server && npm install && cd ..
ADD client/package.json client/package-lock.json ./client/
RUN cd client && npm install && cd ..
ADD . .
ADD server server
ADD client client
