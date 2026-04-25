import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} style={styles.card}>
      <img src={product.image_url} alt={product.name} style={styles.image} />
      <div style={styles.info}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>{parseFloat(product.price).toFixed(2)} €</span>
          <span style={styles.stock}>Stock : {product.stock}</span>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'block',
    color: 'inherit'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  info: {
    padding: '16px'
  },
  category: {
    fontSize: '11px',
    textTransform: 'uppercase',
    color: '#e94560',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  name: {
    fontSize: '16px',
    margin: '6px 0',
    color: '#1a1a2e'
  },
  description: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1a1a2e'
  },
  stock: {
    fontSize: '12px',
    color: '#aaa'
  }
};

export default ProductCard;