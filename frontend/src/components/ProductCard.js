import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={product.image_url} alt={product.name} style={styles.image} />
      </div>
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
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'block',
    color: 'inherit',
    border: '1px solid #f0f0f0',
    padding: '16px'
  },
  imageContainer: {
    background: '#f4f6f8',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'contain'
  },
  info: {
    padding: '0 8px'
  },
  category: {
    fontSize: '12px',
    color: 'var(--text-light)',
    fontWeight: '500',
    marginBottom: '6px',
    display: 'block'
  },
  name: {
    fontSize: '18px',
    margin: '0 0 8px 0',
    color: 'var(--text-dark)',
    fontWeight: '600'
  },
  description: {
    display: 'none' // Hide description on grid view for cleaner look
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px'
  },
  price: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--primary)'
  },
  stock: {
    fontSize: '12px',
    color: '#aaa'
  }
};

export default ProductCard;