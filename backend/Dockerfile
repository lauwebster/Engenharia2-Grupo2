# Dockerfile para o backend
FROM node:22

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o código para o container
COPY . .

# Expõe a porta do backend
EXPOSE 8080

# Usa o Nodemon no modo de desenvolvimento
CMD ["npm", "run", "dev"]
