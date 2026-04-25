import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../api';
import { useApp } from '../context/AppContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { user, fetchCart } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate('/login');
    try {
      await addToCart({ product_id: product.id, quantity: 1 });
      await fetchCart();
      setMessage('✅ Ajouté au panier !');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage('❌ Erreur');
    }
  };

  if (loading) return <p style={styles.loading}>Chargement...</p>;
  if (!product) return <p style={styles.loading}>Produit non trouvé</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Retour</button>
      <div style={styles.card}>
        <img src={product.image_url} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>{parseFloat(product.price).toFixed(2)} €</p>
          <p style={styles.stock}>Stock disponible : {product.stock}</p>
          {message && <p style={styles.message}>{message}</p>}
          <button onClick={handleAddToCart} style={styles.btn}>
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '30px auto', padding: '0 20px' },
  back: { background: 'none', border: 'none', fontSize: '15px', color: '#666', marginBottom: '20px', cursor: 'pointer' },
  card: { display: 'flex', gap: '40px', background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  image: { width: '400px', height: '400px', objectFit: 'cover' },
  info: { padding: '40px', flex: 1 },
  category: { fontSize: '12px', textTransform: 'uppercase', color: '#e94560', fontWeight: 'bold', letterSpacing: '1px' },
  name: { fontSize: '26px', margin: '10px 0', color: '#1a1a2e' },
  description: { color: '#666', lineHeight: '1.6', marginBottom: '20px' },
  price: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '10px' },
  stock: { color: '#aaa', fontSize: '14px', marginBottom: '20px' },
  message: { background: '#f0fff4', color: '#2e7d32', padding: '10px', borderRadius: '8px', marginBottom: '16px' },
  btn: { background: '#e94560', color: 'white', border: 'none', padding: '14px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' },
  loading: { textAlign: 'center', padding: '60px', color: '#888' }
};

export default ProductDetail;