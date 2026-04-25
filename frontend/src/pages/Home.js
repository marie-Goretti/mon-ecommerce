import { useState, useEffect } from 'react';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['Tous', 'Électronique', 'Sport', 'Livres', 'Vêtements', 'Maison'];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category !== 'Tous') params.category = category;
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
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Bienvenue sur MonShop 🛍️</h1>
        <p style={styles.heroSub}>Découvrez nos meilleurs produits</p>
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Filtres catégories */}
      <div style={styles.categories}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              ...styles.catBtn,
              background: category === cat ? '#e94560' : 'white',
              color: category === cat ? 'white' : '#333'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille produits */}
      {loading ? (
        <p style={styles.loading}>Chargement...</p>
      ) : products.length === 0 ? (
        <p style={styles.loading}>Aucun produit trouvé</p>
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
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' },
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    borderRadius: '16px',
    padding: '50px',
    textAlign: 'center',
    margin: '30px 0'
  },
  heroTitle: { color: 'white', fontSize: '32px', marginBottom: '10px' },
  heroSub: { color: '#a8b2d8', marginBottom: '25px' },
  searchInput: {
    width: '100%',
    maxWidth: '400px',
    padding: '12px 20px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '15px',
    outline: 'none'
  },
  categories: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' },
  catBtn: {
    padding: '8px 18px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px'
  },
  loading: { textAlign: 'center', padding: '40px', color: '#888' }
};

export default Home;