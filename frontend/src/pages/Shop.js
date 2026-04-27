import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api';
import ProductCard from '../components/ProductCard';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategoriesList(['All', ...res.data.map(cat => cat.name)]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category !== 'All') params.category = category;
      const res = await getProducts(params);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Boutique</h1>
      
      {/* Category Filters */}
      <div style={styles.filters}>
        {categoriesList.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              ...styles.filterBtn,
              background: category === cat ? 'var(--primary)' : 'transparent',
              color: category === cat ? 'white' : 'var(--text-light)',
              fontWeight: category === cat ? 'bold' : '500'
            }}
          >
            {cat === 'All' ? 'Tous les produits' : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : products.length === 0 ? (
        <p style={styles.loading}>Aucun produit trouvé dans cette catégorie.</p>
      ) : (
        <div style={styles.grid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' },
  title: { fontSize: '32px', marginBottom: '30px', color: 'var(--text-dark)' },
  filters: {
    display: 'flex',
    gap: '20px',
    marginBottom: '40px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px',
    overflowX: 'auto',
    whiteSpace: 'nowrap'
  },
  filterBtn: {
    border: 'none',
    background: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '20px',
    transition: 'all 0.2s'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px'
  },
  loading: { textAlign: 'center', padding: '40px', color: '#888' }
};

export default Shop;
