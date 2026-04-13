# 📚 Book Club API

API REST para um clube do livro por assinatura, desenvolvida com Node.js, PostgreSQL, Stripe e AWS SES.

## 🚀 Tecnologias

- Node.js + Express
- PostgreSQL + Prisma ORM
- Autenticação JWT
- Stripe (pagamentos e webhooks)
- AWS SES (envio de emails)
- Nodemailer

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Stripe
- Conta na AWS com SES configurado

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/aamandabraun/book-club-api.git
cd book-club-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Preencha o `.env` com suas credenciais.

4. Rode as migrations:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

## 📡 Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Cadastrar usuário |
| POST | /auth/login | Fazer login |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /users/me | Dados do usuário logado |

### Planos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /plans | Listar planos |
| POST | /plans | Criar plano (autenticado) |

### Assinaturas
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /subscriptions | Criar assinatura |
| GET | /subscriptions/me | Ver minha assinatura |
| DELETE | /subscriptions/cancel | Cancelar assinatura |

## 🔐 Autenticação

As rotas protegidas precisam do token JWT no header

## 💳 Testando pagamentos

Use o cartão de teste do Stripe:
- **Número:** 4242 4242 4242 4242
- **Validade:** qualquer data futura
- **CVC:** qualquer 3 dígitos

## 🌊 Webhooks

Para testar webhooks localmente, use o Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/webhooks/stripe
```