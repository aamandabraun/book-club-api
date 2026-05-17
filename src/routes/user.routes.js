const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                   example: 9761d628-9f58-4a06-8c47-727b146cfccc
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/me', authMiddleware, (req, res) => {
  res.json({ userId: req.userId });
});

module.exports = router;