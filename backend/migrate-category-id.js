const pool = require('./src/config/db');

async function migrate() {
  try {
    console.log('--- Démarrage de la migration: category_id ---');

    await pool.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id)');
    console.log('✅ Colonne category_id ajoutée.');

    await pool.query('UPDATE products p SET category_id = c.id FROM categories c WHERE p.category = c.name');
    console.log('✅ Données category_id mises à jour.');

    await pool.query('ALTER TABLE products DROP COLUMN category');
    console.log('✅ Colonne category texte supprimée.');

    console.log('--- Migration terminée avec succès ---');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    pool.end();
  }
}

migrate();
