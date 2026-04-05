const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Book Club API funcionando!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;