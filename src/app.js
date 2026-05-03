const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  credentials: true,
}));

const webhookRoutes = require('./routes/webhook.routes');
app.use('/webhooks/stripe', webhookRoutes);

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const planRoutes = require('./routes/plan.routes');
const subscriptionRoutes = require('./routes/subscription.routes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/plans', planRoutes);
app.use('/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Book Club API funcionando!' });
});

app.get('/success', (req, res) => {
  res.json({ message: 'Pagamento realizado com sucesso!' });
});

app.get('/cancel', (req, res) => {
  res.json({ message: 'Pagamento cancelado.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;