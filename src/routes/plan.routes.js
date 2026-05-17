const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Lista todos os planos disponíveis
 *     tags: [Planos]
 *     responses:
 *       200:
 *         description: Lista de planos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 */
router.get('/', planController.getAllPlans);

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Cria um novo plano (requer autenticação)
 *     tags: [Planos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - interval
 *               - stripePriceId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Caixa do Mundo · Mensal
 *               price:
 *                 type: number
 *                 example: 29.90
 *               interval:
 *                 type: string
 *                 example: month
 *               stripePriceId:
 *                 type: string
 *                 example: price_1TIqNmAcU8hevhqdmaVCfsTm
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authMiddleware, planController.createPlan);

module.exports = router;