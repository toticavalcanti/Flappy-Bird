# Usa uma imagem do Node.js
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Se você tiver um .env ou outros arquivos de configuração para copiar, faça isso aqui
# COPY .env ./

# Copia a pasta build do seu projeto local para o container
COPY ./build/ ./

# Instala o pacote serve globalmente no container
RUN npm install -g serve

# Expõe a porta que o serve usará para servir o aplicativo
EXPOSE 5000

# Define o comando para iniciar o aplicativo usando serve
CMD ["serve", "-s", ".", "-l", "5000"]
