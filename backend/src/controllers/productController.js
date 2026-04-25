const pool = require('../config/db');

// Tous les produits
const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];

    if (category && search) {
      query += ' WHERE category = $1 AND name ILIKE $2';
      params.push(category, `%${search}%`);
    } else if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    } else if (search) {
      query += ' WHERE name ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Un seul produit par ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getAllProducts, getProductById };