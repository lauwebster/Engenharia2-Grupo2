# Dockerfile

# Use uma imagem Node.js como base
FROM node:22

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de dependências para o container e instale-as
COPY package*.json ./
RUN npm install

# Copie todo o restante do código para o container
COPY . .

# Expõe a porta que o servidor usará
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
