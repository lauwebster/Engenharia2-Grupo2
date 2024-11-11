# Dockerfile do backend

FROM node:16

WORKDIR /app

# Copia os arquivos de configuração de dependências para aproveitar o cache
COPY package*.json ./

# Instala as dependências do Node.js e do Prisma
RUN npm install
RUN npm install prisma @prisma/client
RUN npx prisma generate

# Copia o restante do código do backend para o container
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
