const subscriptionRepository = require('../repositories/subscription.repository');
const planRepository = require('../repositories/plan.repository');
const stripe = require('../config/stripe');

async function getMySubscription(userId) {
  const subscription = await subscriptionRepository.findByUserId(userId);
  if (!subscription) {
    throw new Error('Assinatura não encontrada');
  }
  return subscription;
}

async function createSubscription(userId, planId) {
  const plan = await planRepository.findById(planId);
  if (!plan) {
    throw new Error('Plano não encontrado');
  }

  const existing = await subscriptionRepository.findByUserId(userId);
  if (existing) {
    throw new Error('Usuário já possui uma assinatura');
  }

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: plan.stripePriceId,
        quantity: 1
      }
    ],
    metadata: {
      userId: userId
    },
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  });

  const subscription = await subscriptionRepository.createSubscription({
    userId,
    planId,
    status: 'pending'
  });

  return { subscription, checkoutUrl: stripeSession.url };
}

async function cancelSubscription(userId) {
  const subscription = await subscriptionRepository.findByUserId(userId);
  if (!subscription) {
    throw new Error('Assinatura não encontrada');
  }

  return subscriptionRepository.updateSubscription(userId, {
    status: 'cancelled'
  });
}

module.exports = { getMySubscription, createSubscription, cancelSubscription };