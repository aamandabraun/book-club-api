const subscriptionService = require('../services/subscription.service');

async function getMySubscription(req, res) {
  try {
    const subscription = await subscriptionService.getMySubscription(req.userId);
    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

async function createSubscription(req, res) {
  try {
    const { planId } = req.body;
    const subscription = await subscriptionService.createSubscription(req.userId, planId);
    return res.status(201).json(subscription);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function cancelSubscription(req, res) {
  try {
    await subscriptionService.cancelSubscription(req.userId);
    return res.status(200).json({ message: 'Assinatura cancelada com sucesso' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { getMySubscription, createSubscription, cancelSubscription };