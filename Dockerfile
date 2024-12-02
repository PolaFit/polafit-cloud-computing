FROM node:20.18.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY polafit-443507-e984791db3ea.json /app/

EXPOSE 8080

CMD ["npm", "run", "start"]