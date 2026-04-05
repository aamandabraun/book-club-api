const planRepository = require('../repositories/plan.repository');

async function getAllPlans() {
  return planRepository.findAll();
}

async function getPlanById(id) {
  const plan = await planRepository.findById(id);
  if (!plan) {
    throw new Error('Plano não encontrado');
  }
  return plan;
}

async function createPlan(name, price, interval, stripePriceId) {
  return planRepository.createPlan({ name, price, interval, stripePriceId });
}

module.exports = { getAllPlans, getPlanById, createPlan };