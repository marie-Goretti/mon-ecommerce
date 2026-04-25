const pool = require('./src/config/db');

async function migrate() {
  try {
    console.log('--- Démarrage de la migration ---');

    // 1. Création de la table categories
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      )
    `);
    console.log('✅ Table categories prête.');

    // 2. Migration des catégories existantes
    await pool.query(`
      INSERT INTO categories (name)
      SELECT DISTINCT category FROM products WHERE category IS NOT NULL
      ON CONFLICT (name) DO NOTHING;
    `);
    console.log('✅ Catégories existantes migrées.');

    // 3. Promotion d'un utilisateur en admin (le premier)
    const users = await pool.query('SELECT * FROM users ORDER BY id ASC LIMIT 1');
    if (users.rows.length > 0) {
      const firstUser = users.rows[0];
      await pool.query('UPDATE users SET role = $1 WHERE id = $2', ['admin', firstUser.id]);
      console.log(`✅ L'utilisateur ${firstUser.email} a été promu administrateur.`);
    } else {
      console.log('⚠️ Aucun utilisateur trouvé pour le promouvoir en admin.');
    }

    console.log('--- Migration terminée avec succès ---');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    pool.end();
  }
}

migrate();
