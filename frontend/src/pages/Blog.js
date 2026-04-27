import React from 'react';

function Blog() {
  return (
    <div style={styles.container}>
      <h1>Blog</h1>
      <p>Lisez nos derniers articles et actualités.</p>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }
};

export default Blog;
