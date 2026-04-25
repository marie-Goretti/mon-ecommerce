import { useApp } from '../context/AppContext';
import { removeFromCart } from '../api';

function Cart() {
  const { cart, fetchCart, user } = useApp();

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  if (!user) return <p style={styles.empty}>Connectez-vous pour voir votre panier 🔒</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mon Panier 🛒</h1>
      {cart.length === 0 ? (
        <p style={styles.empty}>Votre panier est vide</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={styles.item}>
              <img src={item.image_url} alt={item.name} style={styles.image} />
              <div style={styles.info}>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.price}>{parseFloat(item.price).toFixed(2)} €</p>
                <p style={styles.qty}>Quantité : {item.quantity}</p>
              </div>
              <div style={styles.right}>
                <p style={styles.subtotal}>{(parseFloat(item.price) * item.quantity).toFixed(2)} €</p>
                <button onClick={() => handleRemove(item.id)} style={styles.removeBtn}>🗑️ Retirer</button>
              </div>
            </div>
          ))}
          <div style={styles.totalBox}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalAmount}>{total.toFixed(2)} €</span>
          </div>
          <button style={styles.checkoutBtn}>✅ Commander</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '30px auto', padding: '0 20px' },
  title: { fontSize: '26px', marginBottom: '24px', color: '#1a1a2e' },
  empty: { textAlign: 'center', padding: '60px', color: '#888', fontSize: '18px' },
  item: { display: 'flex', gap: '20px', background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', alignItems: 'center' },
  image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' },
  info: { flex: 1 },
  name: { fontSize: '16px', marginBottom: '6px', color: '#1a1a2e' },
  price: { color: '#888', fontSize: '14px' },
  qty: { color: '#aaa', fontSize: '13px', marginTop: '4px' },
  right: { textAlign: 'right' },
  subtotal: { fontSize: '18px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '10px' },
  removeBtn: { background: 'none', border: '1px solid #e94560', color: '#e94560', padding: '6px 12px', borderRadius: '6px', fontSize: '13px' },
  totalBox: { display: 'flex', justifyContent: 'space-between', background: 'white', padding: '20px', borderRadius: '12px', marginTop: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' },
  totalLabel: { fontSize: '18px', fontWeight: 'bold' },
  totalAmount: { fontSize: '22px', fontWeight: 'bold', color: '#e94560' },
  checkoutBtn: { width: '100%', padding: '15px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '16px' }
};

export default Cart;