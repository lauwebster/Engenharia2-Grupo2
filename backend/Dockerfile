# backend/Dockerfile
FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8081
CMD ["npx", "nodemon", "server.js"]
