import { Link, useNavigate } from 'react-router-dom';
import { Heart, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { addToCart } from '../api';

function ProductCard({ product }) {
  const { user, fetchCart } = useApp();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return navigate('/login');
    try {
      await addToCart({ product_id: product.id, quantity: 1 });
      await fetchCart();
      alert('Ajouté au panier !');
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur lors de l\'ajout');
    }
  };

  return (
    <Link to={`/products/${product.id}`} style={styles.card}>
      <div style={styles.imageContainer}>
        <div style={styles.heartIcon}>
          <Heart size={16} color="#666" />
        </div>
        <img src={product.image_url} alt={product.name} style={styles.image} />
      </div>
      <div style={styles.info}>
        <h3 style={styles.name} title={product.name}>{product.name}</h3>
        <p style={styles.description} title={product.description}>
          {product.description && product.description.length > 60 ? product.description.substring(0, 60) + '...' : product.description}
        </p>

        <div style={styles.footer}>
          <span style={styles.price}>{parseFloat(product.price).toFixed(0)} FCFA</span>
          <button onClick={handleAddToCart} style={styles.addBtn}>
            Ajouter <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    color: 'inherit',
    border: '1px solid #f9f9f9',
    padding: '16px',
    textDecoration: 'none'
  },
  imageContainer: {
    background: '#f8f9fa',
    borderRadius: '12px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    aspectRatio: '1 / 1',
    width: '100%',
    overflow: 'hidden'
  },
  heartIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'white',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  info: {
    padding: '0 4px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  name: {
    fontSize: '18px',
    margin: '0 0 6px 0',
    color: '#2d3748',
    fontWeight: '700',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  description: {
    fontSize: '13px',
    color: '#718096',
    lineHeight: '1.4',
    marginBottom: '12px'
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#2d3748'
  },
  addBtn: {
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer'
  }
};

export default ProductCard;