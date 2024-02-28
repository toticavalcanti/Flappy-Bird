FROM node:18-alpine

WORKDIR /App

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]