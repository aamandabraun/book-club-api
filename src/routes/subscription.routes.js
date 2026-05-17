const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { createSubscriptionSchema } = require('../schemas');

/**
 * @swagger
 * /subscriptions/me:
 *   get:
 *     summary: Retorna a assinatura do usuário autenticado
 *     tags: [Assinaturas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Assinatura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Assinatura não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/me', authMiddleware, subscriptionController.getMySubscription);

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Cria uma nova assinatura e retorna URL de checkout do Stripe
 *     tags: [Assinaturas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *             properties:
 *               planId:
 *                 type: string
 *                 format: uuid
 *                 example: 2a354795-fc8a-4f4d-b84c-32b0678d7d8a
 *     responses:
 *       201:
 *         description: Assinatura criada com URL de checkout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscription:
 *                   $ref: '#/components/schemas/Subscription'
 *                 checkoutUrl:
 *                   type: string
 *                   example: https://checkout.stripe.com/...
 *       400:
 *         description: Usuário já possui assinatura ou plano não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authMiddleware, validate(createSubscriptionSchema), subscriptionController.createSubscription);

/**
 * @swagger
 * /subscriptions/cancel:
 *   delete:
 *     summary: Cancela a assinatura do usuário autenticado
 *     tags: [Assinaturas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Assinatura cancelada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assinatura cancelada com sucesso
 *       400:
 *         description: Assinatura não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/cancel', authMiddleware, subscriptionController.cancelSubscription);

module.exports = router;