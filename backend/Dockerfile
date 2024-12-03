# Dockerfile para o backend
FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd
RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

RUN mkdir -p scripts
COPY scripts/wait-and-migrate.sh scripts/
RUN chmod +x scripts/wait-and-migrate.sh

COPY . .

ENTRYPOINT ["./scripts/wait-and-migrate.sh"]

CMD ["nodemon", "server.js"]
