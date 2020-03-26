FROM node:12.15.0-alpine AS build
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm install
RUN npm install angular-oauth2-oidc 
COPY . .
EXPOSE 4200
CMD [ "npm", "start" ]
