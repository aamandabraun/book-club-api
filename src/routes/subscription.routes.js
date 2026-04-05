const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/me', authMiddleware, subscriptionController.getMySubscription);
router.post('/', authMiddleware, subscriptionController.createSubscription);
router.delete('/cancel', authMiddleware, subscriptionController.cancelSubscription);

module.exports = router;