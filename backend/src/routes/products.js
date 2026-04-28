const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Liste de tous les produits
 *     tags: [Produits]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche par nom
 *         example: iPhone
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *         example: Électronique
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get('/', getAllProducts);


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Détail d'un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *         example: 1
 *     responses:
 *       200:
 *         description: Détail du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


router.get('/:id', getProductById);

router.post('/', authMiddleware, adminMiddleware, createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;