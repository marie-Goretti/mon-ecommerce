const pool = require('./db');

const initDB = async () => {
  try {
    // Table utilisateurs
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Table produits
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(500),
        stock INTEGER DEFAULT 0,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Table panier
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Quelques produits de test
    await pool.query(`
      INSERT INTO products (name, description, price, image_url, stock, category)
      VALUES 
        ('iPhone 15', 'Smartphone Apple dernière génération', 999.99, 'https://picsum.photos/seed/iphone/400/400', 10, 'Électronique'),
        ('Nike Air Max', 'Chaussures de sport confortables', 129.99, 'https://picsum.photos/seed/nike/400/400', 25, 'Sport'),
        ('Livre JavaScript', 'Apprendre JS de zéro à expert', 39.99, 'https://picsum.photos/seed/book/400/400', 50, 'Livres'),
        ('Casque Sony', 'Casque audio sans fil premium', 299.99, 'https://picsum.photos/seed/sony/400/400', 15, 'Électronique'),
        ('T-shirt Basic', 'T-shirt coton 100% bio', 24.99, 'https://picsum.photos/seed/tshirt/400/400', 100, 'Vêtements'),
        ('Lampe de Bureau', 'Lampe LED réglable', 49.99, 'https://picsum.photos/seed/lamp/400/400', 30, 'Maison')
      ON CONFLICT DO NOTHING;
    `);

    console.log('✅ Tables créées et données insérées !');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
};

initDB();