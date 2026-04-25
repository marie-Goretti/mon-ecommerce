const pool = require('../config/db');

// Créer une commande à partir du panier
const createOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user.id;
    
    // 1. Récupérer le panier
    const cartRes = await client.query(`
      SELECT ci.quantity, p.id as product_id, p.price 
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = $1
    `, [userId]);

    const cartItems = cartRes.rows;
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Panier vide' });
    }

    // 2. Calculer le total
    const totalAmount = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

    await client.query('BEGIN');

    // 3. Créer la commande
    const orderRes = await client.query(
      'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING id',
      [userId, totalAmount]
    );
    const orderId = orderRes.rows[0].id;

    // 4. Insérer les détails de la commande
    for (const item of cartItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // 5. Vider le panier
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

    await client.query('COMMIT');
    res.status(201).json({ message: 'Commande créée avec succès', orderId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de la commande' });
  } finally {
    client.release();
  }
};

// Récupérer les commandes de l'utilisateur connecté
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(`
      SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC
    `, [userId]);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ADMIN: Récupérer toutes les commandes
const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, u.name as user_name, u.email as user_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ADMIN: Mettre à jour le statut
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// (Optionnel) Obtenir les détails d'une commande
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    // Vérifier l'appartenance si pas admin
    const orderRes = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderRes.rows.length === 0) return res.status(404).json({ error: 'Commande non trouvée' });
    
    if (role !== 'admin' && orderRes.rows[0].user_id !== userId) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    const itemsRes = await pool.query(`
      SELECT oi.*, p.name, p.image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [id]);

    res.json({ order: orderRes.rows[0], items: itemsRes.rows });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getOrderDetails };
