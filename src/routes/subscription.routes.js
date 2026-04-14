const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { createSubscriptionSchema } = require('../schemas');

router.get('/me', authMiddleware, subscriptionController.getMySubscription);
router.post('/', authMiddleware, validate(createSubscriptionSchema), subscriptionController.createSubscription);
router.delete('/cancel', authMiddleware, subscriptionController.cancelSubscription);

module.exports = router;