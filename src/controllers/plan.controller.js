const planService = require('../services/plan.service');

async function getAllPlans(req, res) {
  try {
    const plans = await planService.getAllPlans();
    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function createPlan(req, res) {
  try {
    const { name, price, interval, stripePriceId } = req.body;
    const plan = await planService.createPlan(name, price, interval, stripePriceId);
    return res.status(201).json(plan);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { getAllPlans, createPlan };