const pool = require('../config/db');

// Tous les produits
const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT p.*, c.name as category FROM products p LEFT JOIN categories c ON p.category_id = c.id';
    const params = [];

    if (category && search) {
      query += ' WHERE c.name = $1 AND p.name ILIKE $2';
      params.push(category, `%${search}%`);
    } else if (category) {
      query += ' WHERE c.name = $1';
      params.push(category);
    } else if (search) {
      query += ' WHERE p.name ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';
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
    const result = await pool.query('SELECT p.*, c.name as category FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer un produit
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, category_id, stock } = req.body;
    if (!name || !price || !category_id) {
      return res.status(400).json({ error: 'Nom, prix et catégorie requis' });
    }
    
    const result = await pool.query(
      'INSERT INTO products (name, description, price, image_url, category_id, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, image_url, category_id, stock || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Modifier un produit
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url, category_id, stock } = req.body;
    
    const result = await pool.query(
      'UPDATE products SET name=$1, description=$2, price=$3, image_url=$4, category_id=$5, stock=$6 WHERE id=$7 RETURNING *',
      [name, description, price, image_url, category_id, stock, id]
    );
    
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };