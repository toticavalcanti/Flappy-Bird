FROM node:18-alpine

WORKDIR /App

# Expondo a porta 3000 para a aplicação
EXPOSE 3000

# Copiando os arquivos de definição de dependências
COPY package.json ./

# Instalando dependências. As ferramentas são necessárias para compilação de pacotes nativos.
RUN npm ci --omit=dev && \
    apk add --no-cache python3 make g++

# Copiando o restante dos arquivos do projeto
COPY . .

# Remova o package-lock.json existente (opcional, dependendo da sua estratégia)
# RUN rm -f package-lock.json

# Instale as dependências do projeto, regenerando o package-lock.json
RUN npm install --loglevel verbose

# Construindo a aplicação
RUN npm run build

# Comando para iniciar a aplicação
CMD ["npm", "start"]
