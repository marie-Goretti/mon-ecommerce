import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      <h1>À propos de nous</h1>
      <p>Découvrez notre histoire et notre passion pour le mobilier design.</p>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }
};

export default About;
