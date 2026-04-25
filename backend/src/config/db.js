const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true
  }
});

pool.connect()
  .then(client => {
    console.log('✅ Connecté à PostgreSQL');
    client.release();
  })
  .catch(err => console.error('❌ Erreur connexion DB:', err.message));

module.exports = pool;