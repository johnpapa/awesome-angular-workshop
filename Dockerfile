# Client App
FROM johnpapa/angular-cli as client-app
LABEL authors="John Papa"
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
# RUN ng build 7-deploy --prod
RUN ng build 7-deploy

# Node server
FROM node:8.11-alpine as node-server
WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY server.js .
COPY /server /usr/src/app/server


# Final image
FROM node:8.11-alpine
WORKDIR /usr/src/app
COPY --from=node-server /usr/src /usr/src
COPY --from=client-app /usr/src/app/dist/7-deploy ./
EXPOSE 9070
CMD ["node", "server.js"]

