const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', planController.getAllPlans);
router.post('/', authMiddleware, planController.createPlan);

module.exports = router;