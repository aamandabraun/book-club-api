# 📦 Caixa do Mundo

> *Uma viagem por mês, sem sair do sofá.*

Plataforma de assinatura de caixas literárias temáticas com destinos internacionais. Todo mês, um país diferente chega na porta do assinante com livros, mimos e experiências culturais cuidadosamente selecionados.

🌐 **[ACESSE](https://caixa-do-mundo.vercel.app/)**

<br>

## 🚀 Funcionalidades

- ✅ Cadastro e autenticação de usuários com JWT
- ✅ Integração com Stripe para pagamentos e assinaturas recorrentes
- ✅ Webhooks do Stripe para atualização automática de status
- ✅ Envio de e-mails transacionais (boas-vindas e confirmação de assinatura)
- ✅ Dashboard personalizado com informações do plano e próxima viagem
- ✅ Validação de dados com Zod
- ✅ Deploy em produção com CI/CD automático

<br>

## 🛠️ Tecnologias e Ferramentas

### Backend
- **Node.js** + **Express** — servidor e rotas REST
- **Prisma ORM** — modelagem e acesso ao banco de dados
- **PostgreSQL** — banco de dados relacional
- **JWT** — autenticação e autorização
- **Zod** — validação de schemas
- **Stripe** — pagamentos e assinaturas recorrentes
- **Nodemailer** — envio de e-mails transacionais
- **Docker** — containerização da aplicação

### Frontend
- **React** + **TypeScript** — interface moderna e tipada
- **Vite** — bundler e ambiente de desenvolvimento
- **Tailwind CSS** — estilização utilitária
- **React Router** — navegação entre páginas

### Infraestrutura
- **Render** — deploy do backend com Docker
- **Vercel** — deploy do frontend
- **Resend** - envio dos e-mails
- **UptimeRobot** — monitoramento de disponibilidade

<br>

## 📁 Estrutura do Projeto

```
caixa-do-mundo/
├── frontend/               # Aplicação React + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── contexts/       # Contextos React
│   │   ├── hooks/          # Hooks customizados
│   │   ├── services/       # Chamadas à API
│   │   └── lib/            # Utilitários
│   └── ...
├── src/                    # API Node.js
│   ├── controllers/        # Controladores das rotas
│   ├── services/           # Regras de negócio
│   ├── repositories/       # Acesso ao banco de dados
│   ├── middlewares/        # Middlewares (auth, validação)
│   ├── routes/             # Definição de rotas
│   └── config/             # Configurações (Stripe, mailer)
├── prisma/                 # Schema e migrations
├── Dockerfile
└── docker-compose.yml
```

<br>

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose
- Conta no Stripe (modo teste)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/aamandabraun/book-club-api.git
cd book-club-api

# Instale as dependências do backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Preencha o .env com suas credenciais

# Suba o banco de dados com Docker
docker-compose up -d

# Rode as migrations
npx prisma migrate dev

# Popule o banco com dados iniciais
npx prisma db seed

# Inicie o servidor
npm run dev
```

```bash
# Em outro terminal, instale e rode o frontend
cd frontend
npm install
npm run dev
```

<br>

## 🔐 Variáveis de Ambiente

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000

STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
STRIPE_WEBHOOK_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

FRONTEND_URL=
```

<br>

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Cadastro de usuário |
| POST | `/auth/login` | Login |
| GET | `/users/me` | Dados do usuário autenticado |
| GET | `/plans` | Lista de planos disponíveis |
| POST | `/subscriptions` | Criar assinatura (gera link Stripe) |
| GET | `/subscriptions/me` | Assinatura do usuário |
| DELETE | `/subscriptions/cancel` | Cancelar assinatura |
| POST | `/webhooks/stripe` | Webhook do Stripe |

<br>

## 📖 Documentação da API

A documentação completa dos endpoints está disponível via Swagger:

🔗 **[Acesse a documentação](https://book-club-api-neou.onrender.com/api-docs)**


<br>

## 🎬 Demonstração

![Demo do projeto](./demo.gif)
