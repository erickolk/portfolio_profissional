# Frontend Dockerfile - Multi-stage build
FROM node:18-alpine AS builder

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage de produção
FROM node:18-alpine

WORKDIR /app

# Copiar apenas o necessário do stage de build
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["node", ".output/server/index.mjs"]

