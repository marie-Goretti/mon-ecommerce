import { useApp } from '../context/AppContext';
import { removeFromCart, createOrder } from '../api';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

function Cart() {
  const { cart, fetchCart, user } = useApp();
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  const handleQuantityClick = () => {
    alert("Pour modifier la quantité, veuillez retirer l'article et l'ajouter à nouveau avec la bonne quantité.");
  };

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  if (!user) return <p style={styles.empty}>Connectez-vous pour voir votre panier.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>VOTRE PANIER</h1>
      
      {cart.length === 0 ? (
        <p style={styles.empty}>Votre panier est vide</p>
      ) : (
        <div style={styles.layout} className="mobile-col">
          {/* Left Column: Cart Items */}
          <div style={styles.itemsColumn}>
            <div style={styles.itemsList}>
              {cart.map(item => (
                <div key={item.id} style={styles.itemRow} className="mobile-wrap">
                  <button onClick={() => handleRemove(item.id)} style={styles.removeBtn}>
                    <X size={18} color="#888" />
                  </button>
                  
                  <img src={item.image_url} alt={item.name} style={styles.image} />
                  
                  <div style={styles.itemInfo}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemDesc}>{item.category || 'Produit'}</p>
                  </div>
                  
                  <div style={styles.priceOption}>
                    <div style={styles.radioChecked}></div>
                    <span>{parseFloat(item.price).toFixed(0)} FCFA</span>
                  </div>
                  
                  <div style={{...styles.priceOption, minWidth: '80px', color: '#666', fontSize: '13px'}}>
                    Qté: {item.quantity}
                  </div>
                  
                  <div style={styles.itemTotal}>
                    <div style={styles.totalPrice}>{(parseFloat(item.price) * item.quantity).toFixed(0)} FCFA</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Coupon Section */}
            <div style={styles.couponSection}>
              <p style={styles.couponText}>Vous avez un code promo ? Entrez-le ci-dessous.</p>
              <div style={styles.couponInputWrapper} className="mobile-wrap">
                <input type="text" placeholder="Code promo" style={styles.couponInput} />
                <button style={styles.applyBtn}>APPLIQUER</button>
              </div>
            </div>
          </div>

          {/* Right Column: Cart Totals */}
          <div style={styles.totalsColumn} className="mobile-w-100">
            <div style={styles.totalsBox}>
              <h2 style={styles.totalsTitle}>TOTAUX DU PANIER</h2>
              
              <div style={styles.totalsRow}>
                <span style={styles.totalsLabel}>Livraison (3-5 Jours Ouvrés)</span>
                <span style={styles.totalsValue}>Gratuite</span>
              </div>
              
              <div style={styles.totalsRow}>
                <span style={styles.totalsLabel}>Taxes (estimées)</span>
                <span style={styles.totalsValue}>0 FCFA</span>
              </div>
              
              <div style={styles.totalsRow}>
                <span style={styles.totalsLabel}>Sous-total</span>
                <span style={styles.totalsValue}>{subtotal.toFixed(0)} FCFA</span>
              </div>
              
              <div style={styles.divider}></div>
              
              <div style={styles.finalTotalRow}>
                <span style={styles.finalTotalLabel}>Total</span>
                <span style={styles.finalTotalValue}>{subtotal.toFixed(0)} FCFA</span>
              </div>
              
              <button onClick={handleCheckout} style={styles.checkoutBtn}>PASSER À LA CAISSE</button>
              
              <div style={styles.continueShopping}>
                <button onClick={() => navigate('/shop')} style={styles.continueBtn}>&lt; CONTINUER VOS ACHATS</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '40px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif' },
  pageTitle: { fontSize: '28px', fontWeight: '300', marginBottom: '40px', color: '#111', letterSpacing: '1px' },
  empty: { textAlign: 'center', padding: '60px', color: '#888', fontSize: '18px' },
  layout: { display: 'flex', gap: '40px', alignItems: 'flex-start' },
  
  // Left Column
  itemsColumn: { flex: 2 },
  itemsList: { display: 'flex', flexDirection: 'column' },
  itemRow: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px', 
    padding: '24px 0', 
    borderBottom: '1px solid #eee' 
  },
  removeBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  image: { width: '80px', height: '80px', objectFit: 'contain', background: '#f8f9fa', borderRadius: '8px' },
  itemInfo: { flex: 1, minWidth: '150px' },
  itemName: { fontSize: '15px', fontWeight: '500', color: '#111', margin: '0 0 6px 0' },
  itemDesc: { fontSize: '13px', color: '#888', margin: 0 },
  priceOption: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', minWidth: '100px' },
  radioChecked: { width: '12px', height: '12px', borderRadius: '50%', border: '4px solid #111', background: 'white' },
  qtyBtn: { background: 'none', border: 'none', fontSize: '16px', color: '#111', cursor: 'pointer', padding: '0 8px' },
  qtyValue: { fontSize: '14px', fontWeight: '600', minWidth: '20px', textAlign: 'center' },
  itemTotal: { minWidth: '80px', textAlign: 'right' },
  totalPrice: { fontSize: '16px', fontWeight: '700', color: '#111' },
  
  // Coupon Section
  couponSection: { marginTop: '40px', padding: '20px 0' },
  couponText: { fontSize: '13px', color: '#666', marginBottom: '15px' },
  couponInputWrapper: { display: 'flex', gap: '15px', alignItems: 'flex-end', maxWidth: '400px' },
  couponInput: { flex: 1, border: 'none', borderBottom: '1px solid #ccc', padding: '8px 0', fontSize: '14px', outline: 'none', background: 'transparent' },
  applyBtn: { background: 'transparent', border: '1px solid #ccc', padding: '10px 20px', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.2s' },

  // Right Column
  totalsColumn: { flex: 1, minWidth: '320px' },
  totalsBox: { padding: '30px', background: '#fafafa', borderRadius: '2px' },
  totalsTitle: { fontSize: '18px', fontWeight: '300', marginBottom: '30px', color: '#111', letterSpacing: '1px', borderBottom: '2px solid #111', paddingBottom: '15px' },
  totalsRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '13px', color: '#555' },
  totalsLabel: { color: '#666' },
  totalsValue: { fontWeight: '500', color: '#111' },
  divider: { height: '1px', background: '#111', margin: '20px 0' },
  finalTotalRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' },
  finalTotalLabel: { fontSize: '15px', fontWeight: '600', color: '#111' },
  finalTotalValue: { fontSize: '18px', fontWeight: '700', color: '#111' },
  checkoutBtn: { width: '100%', background: '#111', color: 'white', border: 'none', padding: '16px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.2s' },
  continueShopping: { marginTop: '20px', textAlign: 'center' },
  continueBtn: { background: 'none', border: 'none', fontSize: '12px', color: '#666', letterSpacing: '1px', cursor: 'pointer', fontWeight: '500' }
};

export default Cart;