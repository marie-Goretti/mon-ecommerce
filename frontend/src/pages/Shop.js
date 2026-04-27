import React from 'react';

function Shop() {
  return (
    <div style={styles.container}>
      <h1>Boutique</h1>
      <p>Bienvenue dans notre boutique. Retrouvez tous nos produits ici.</p>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }
};

export default Shop;
