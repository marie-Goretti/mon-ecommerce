const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: Email déjà utilisé ou champs manquants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


router.post('/register', register);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       401:
 *         description: Email ou mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


router.post('/login', login);


/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Récupérer le profil utilisateur connecté
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Non authentifié
 */


router.get('/me', authMiddleware, (req, res) => {
  res.json(req.user);
});



module.exports = router;