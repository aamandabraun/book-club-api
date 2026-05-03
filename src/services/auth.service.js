const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const { sendWelcomeEmail } = require('./mail.service');

async function register(name, email, password) {
  const userExists = await userRepository.findByEmail(email);
  if (userExists) {
    throw new Error('Email já cadastrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await sendWelcomeEmail(email, name);
  } catch (err) {
    console.warn('Email de boas-vindas não enviado:', err.message);
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

async function login(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Email ou senha inválidos');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Email ou senha inválidos');
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

module.exports = { register, login };