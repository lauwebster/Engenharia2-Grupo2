# Para rodar o projeto, use o comando
# Esse comando vai construir (se necessário) e iniciar todos os serviços definidos no docker-compose.yml. Rode ele dentro da pasta ENGENHARIA2

docker-compose up -d

# Para encerrar o projeto, use o comando

 docker-compose down

# Para verificar os logs de cada serviço (back ou front)

docker-compose logs -f frontend

# Criar as imagens do Docker pela primeira vez

docker-compose up --build -d

# Se der esse erro: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Basta rodar:

sudo chmod 777 -R /var/run/docker.sock