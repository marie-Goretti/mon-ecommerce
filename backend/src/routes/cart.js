const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

router.use(authMiddleware); // toutes les routes panier nécessitent d'être connecté

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:id', removeFromCart);

module.exports = router;