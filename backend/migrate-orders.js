const pool = require('./src/config/db');

async function migrate() {
  try {
    console.log('--- Démarrage de la migration: Commandes ---');

    // 1. Table orders
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'En attente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table orders créée.');

    // 2. Table order_items
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
        quantity INTEGER NOT NULL,
        price_at_purchase DECIMAL(10,2) NOT NULL
      )
    `);
    console.log('✅ Table order_items créée.');

    console.log('--- Migration terminée avec succès ---');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    pool.end();
  }
}

migrate();
