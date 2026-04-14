const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha obrigatória')
});

const createPlanSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  price: z.number().positive('Preço deve ser positivo'),
  interval: z.enum(['monthly', 'yearly'], 'Intervalo inválido'),
  stripePriceId: z.string().optional()
});

const createSubscriptionSchema = z.object({
  planId: z.string().uuid('ID do plano inválido')
});

module.exports = { registerSchema, loginSchema, createPlanSchema, createSubscriptionSchema };