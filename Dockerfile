FROM node:18-alpine

WORKDIR /App

# Expondo a porta 3000 para a aplicação
EXPOSE 3000

# Copiando os arquivos de definição de dependências
COPY package*.json ./

# Instalando dependências. As ferramentas são necessárias para compilação de pacotes nativos.
RUN npm ci --omit=dev && \
    apk add --no-cache python3 make g++

# Copiando o restante dos arquivos do projeto
COPY . .

# Construindo a aplicação
RUN npm run build

# Comando para iniciar a aplicação
CMD ["npm", "start"]
