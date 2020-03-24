FROM node:12.15.0-alpine

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
