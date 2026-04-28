const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.use(authMiddleware); // toutes les routes panier nécessitent d'être connecté




/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Récupérer le panier de l'utilisateur connecté
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contenu du panier
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Non authentifié
 */

router.get('/', getCart);


/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Ajouter un produit au panier
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id]
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Produit ajouté au panier
 *       401:
 *         description: Non authentifié
 */


router.post('/', addToCart);





/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Retirer un produit du panier
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'item dans le panier
 *     responses:
 *       200:
 *         description: Produit retiré du panier
 *       401:
 *         description: Non authentifié
 */


router.delete('/:id', removeFromCart);

module.exports = router;