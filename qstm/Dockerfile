FROM node:10
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]