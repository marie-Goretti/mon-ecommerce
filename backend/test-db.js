const pool = require('./src/config/db');
pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'products'")
  .then(res => { console.log(res.rows); process.exit(0); })
  .catch(err => { console.error(err); process.exit(1); });
