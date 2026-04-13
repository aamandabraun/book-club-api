const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const subscriptionRepository = require('../repositories/subscription.repository');
const userRepository = require('../repositories/user.repository');
const { sendSubscriptionConfirmationEmail } = require('../services/mail.service');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).json({ message: `Webhook error: ${error.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (userId) {
      await subscriptionRepository.updateSubscription(userId, {
        status: 'active'
      });

      console.log('Buscando usuário:', userId);
      const user = await userRepository.findById(userId);
      console.log('Usuário encontrado:', user);

      if (user) {
        console.log('Enviando e-mail para:', user.email);
        await sendSubscriptionConfirmationEmail(user.email, user.name);
        console.log('E-mail enviado!');
      }
    }
  }

  res.json({ received: true });
});

module.exports = router;