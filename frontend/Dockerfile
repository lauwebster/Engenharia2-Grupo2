# Dockerfile para o frontend
FROM node:22

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expõe a porta do frontend
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "start"]
