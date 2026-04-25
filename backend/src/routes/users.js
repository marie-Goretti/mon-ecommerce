const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/userController');

router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.put('/:id/role', authMiddleware, adminMiddleware, updateUserRole);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
