# 🚀 Portfólio Erick Oliveira

Portfólio comercial completo desenvolvido com Nuxt 3, Express, PostgreSQL e Docker. Sistema moderno com animações Three.js, formulário de contato integrado, admin panel e geração automática de propostas.

## 📋 Índice

- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Deploy](#deploy)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🛠 Tecnologias

### Frontend
- **Nuxt 3** - Framework Vue.js para aplicações web
- **Vue 3** - Framework JavaScript reativo
- **TypeScript** - Superset tipado de JavaScript
- **TailwindCSS** - Framework CSS utilitário
- **Three.js** - Biblioteca para gráficos 3D
- **Zod** - Validação de schemas
- **@vueuse/motion** - Animações Vue

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **PostgreSQL** - Banco de dados relacional
- **Nodemailer** - Envio de emails
- **JWT** - Autenticação
- **Zod** - Validação de dados
- **Puppeteer** - Geração de PDFs

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## ✨ Funcionalidades

- ✅ Hero animado com Three.js (partículas e efeitos)
- ✅ Formulário de contato com validação
- ✅ Envio automático de emails
- ✅ Sistema de cases/projetos
- ✅ Admin panel para gerenciar leads e cases
- ✅ Geração de propostas em PDF
- ✅ SEO otimizado com meta tags e JSON-LD
- ✅ Design responsivo (mobile-first)
- ✅ Rate limiting e segurança
- ✅ Integração com Calendly e WhatsApp

## 📦 Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (para desenvolvimento com containers)
- **PostgreSQL** 15+ (se rodar sem Docker)

## 🚀 Instalação

### Opção 1: Com Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/portfolio-erick-v2.git
cd portfolio-erick-v2
```

2. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cp env.example .env
```

3. Edite o arquivo `.env` com suas configurações

4. Inicie os containers:
```bash
docker-compose up --build
```

5. Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432

### Opção 2: Sem Docker

#### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o PostgreSQL e crie o banco de dados

4. Execute o script SQL de inicialização:
```bash
psql -U seu_usuario -d portfolio < src/db/init.sql
```

5. Configure as variáveis de ambiente (copie do `env.example`)

6. Inicie o servidor:
```bash
npm run dev
```

#### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `env.example`:

```env
# Database
POSTGRES_DB=portfolio
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=sua_senha_segura
DATABASE_URL=postgresql://user:pass@localhost:5432/portfolio

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
ADMIN_EMAIL=seu-email@gmail.com

# Admin
ADMIN_PASSWORD=senha_admin_segura
JWT_SECRET=chave_secreta_aleatoria

# Integrações
CALENDLY_LINK=https://calendly.com/seu-usuario/diagnostico-15
WHATSAPP_NUMBER=5582999999999
SITE_URL=http://localhost:3000

# Frontend
NUXT_PUBLIC_API_URL=http://localhost:5000
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_WHATSAPP_NUMBER=5582999999999
NUXT_PUBLIC_CALENDLY_LINK=https://calendly.com/seu-usuario/diagnostico-15
```

### Configurar SMTP (Gmail)

1. Acesse sua conta Google
2. Ative a verificação em duas etapas
3. Gere uma "Senha de App" em: https://myaccount.google.com/apppasswords
4. Use essa senha na variável `SMTP_PASS`

## 💻 Uso

### Desenvolvimento

```bash
# Com Docker
docker-compose up

# Sem Docker - Terminal 1 (Backend)
cd backend && npm run dev

# Sem Docker - Terminal 2 (Frontend)
cd frontend && npm run dev
```

### Build de Produção

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run start
```

### Acessar Admin Panel

1. Acesse: http://localhost:3000/admin
2. Faça login com a senha configurada em `ADMIN_PASSWORD`
3. Gerencie leads, cases e gere propostas

## 🌐 Deploy

### Vercel (Frontend)

1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente (`NUXT_PUBLIC_*`)
3. Deploy automático

### Railway/Render (Backend + Database)

1. Crie um novo projeto no Railway/Render
2. Adicione PostgreSQL
3. Configure as variáveis de ambiente
4. Faça deploy do backend

### Docker (VPS/Cloud)

```bash
# Build e deploy
docker-compose -f docker-compose.yml up --build -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down
```

## 📁 Estrutura do Projeto

```
portfolio-erick-v2/
├── frontend/                 # Aplicação Nuxt 3
│   ├── assets/              # Estilos e recursos
│   ├── components/          # Componentes Vue
│   │   ├── ui/             # Componentes UI base
│   │   ├── HeroThreePlexus.vue
│   │   ├── ContactForm.vue
│   │   └── ...
│   ├── composables/         # Composables reutilizáveis
│   ├── layouts/             # Layouts da aplicação
│   ├── pages/               # Páginas (rotas)
│   ├── public/              # Arquivos públicos
│   └── nuxt.config.ts       # Configuração Nuxt
├── backend/                  # API Express
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── routes/          # Rotas da API
│   │   ├── middleware/      # Middlewares
│   │   ├── services/        # Serviços (email, PDF)
│   │   ├── db/              # Database e migrations
│   │   └── server.js        # Entrada da aplicação
│   └── package.json
├── docker-compose.yml        # Orquestração Docker
├── env.example              # Exemplo de variáveis
└── README.md                # Este arquivo
```

## 📝 Scripts Úteis

### Frontend
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run generate     # Geração estática
```

### Backend
```bash
npm run dev          # Servidor com hot-reload
npm run start        # Servidor de produção
```

### Docker
```bash
docker-compose up                 # Iniciar todos os serviços
docker-compose up --build         # Rebuild e iniciar
docker-compose down               # Parar todos os serviços
docker-compose logs -f frontend   # Ver logs do frontend
docker-compose logs -f backend    # Ver logs do backend
```

## 🔒 Segurança

- ✅ Rate limiting em todas as rotas
- ✅ Helmet.js para headers de segurança
- ✅ Validação de dados com Zod
- ✅ Proteção contra SQL injection
- ✅ JWT para autenticação admin
- ✅ CORS configurado
- ✅ Honeypot no formulário de contato

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `.env`
- Certifique-se de que o banco foi criado

### Erro ao enviar email
- Verifique as credenciais SMTP
- Confirme que a "Senha de App" foi gerada (Gmail)
- Teste a conexão SMTP

### Three.js não carrega
- Limpe o cache do navegador
- Verifique o console para erros WebGL
- Confirme que o navegador suporta WebGL

## 📄 Licença

MIT License - veja LICENSE para detalhes

## 👤 Autor

**Erick Oliveira**
- Website: [erickoliveira.dev](https://erickoliveira.dev)
- GitHub: [@erickoliveira](https://github.com/erickoliveira)
- LinkedIn: [Erick Oliveira](https://linkedin.com/in/erickoliveira)

---

Feito com ❤️ por Erick Oliveira

