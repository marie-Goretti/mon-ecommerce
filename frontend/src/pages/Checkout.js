import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { createOrder } from '../api';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';

function Checkout() {
  const { cart, fetchCart, user } = useApp();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [address, setAddress] = useState({
    name: user?.name || '',
    street: '',
    city: '',
    postalCode: ''
  });

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    try {
      // Simulation of a payment process (2 seconds delay)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Actual order creation using existing backend
      await createOrder();
      await fetchCart();
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
      
    } catch (err) {
      alert("Erreur lors de la création de la commande");
      setLoading(false);
    }
  };

  if (!user) return <p style={styles.empty}>Connectez-vous pour finaliser votre commande</p>;
  if (cart.length === 0 && !success) return <p style={styles.empty}>Votre panier est vide</p>;

  if (success) {
    return (
      <div style={styles.successContainer}>
        <ShieldCheck size={64} color="#10b981" />
        <h2 style={{color: '#111'}}>Paiement Réussi !</h2>
        <p style={{color: '#666'}}>Merci pour votre commande. Vous allez être redirigé...</p>
      </div>
    );
  }

  return (
    <div style={styles.container} className="mobile-col">
      <div style={styles.formSection} className="mobile-w-100">
        <h1 style={styles.title}>Finaliser la commande</h1>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}><Truck size={20} /> Adresse de Livraison</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nom Complet</label>
              <input type="text" style={styles.input} required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Adresse</label>
              <input type="text" style={styles.input} required value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
            </div>
            <div style={{display: 'flex', gap: '15px'}} className="mobile-col">
              <div style={{...styles.inputGroup, flex: 2}}>
                <label style={styles.label}>Ville</label>
                <input type="text" style={styles.input} required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
              </div>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Code Postal</label>
                <input type="text" style={styles.input} required value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})} />
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}><CreditCard size={20} /> Paiement Sécurisé</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Numéro de carte</label>
              <input type="text" placeholder="0000 0000 0000 0000" style={styles.input} required value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: e.target.value})} />
            </div>
            <div style={{display: 'flex', gap: '15px'}} className="mobile-col">
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>Expiration</label>
                <input type="text" placeholder="MM/AA" style={styles.input} required value={payment.expiry} onChange={e => setPayment({...payment, expiry: e.target.value})} />
              </div>
              <div style={{...styles.inputGroup, flex: 1}}>
                <label style={styles.label}>CVC</label>
                <input type="text" placeholder="123" style={styles.input} required value={payment.cvc} onChange={e => setPayment({...payment, cvc: e.target.value})} />
              </div>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Traitement en cours...' : `Payer ${subtotal.toFixed(0)} FCFA`}
          </button>
        </form>
      </div>

      <div style={styles.summarySection} className="mobile-w-100">
        <div style={styles.summaryCard}>
          <h2 style={styles.summaryTitle}>Récapitulatif</h2>
          <div style={styles.summaryItems}>
            {cart.map(item => (
              <div key={item.id} style={styles.summaryItem}>
                <div style={styles.summaryItemInfo}>
                  <img src={item.image_url} alt={item.name} style={styles.summaryImg} />
                  <div>
                    <div style={styles.summaryItemName}>{item.name}</div>
                    <div style={styles.summaryItemQty}>Qté: {item.quantity}</div>
                  </div>
                </div>
                <div style={styles.summaryItemPrice}>{(parseFloat(item.price) * item.quantity).toFixed(0)}</div>
              </div>
            ))}
          </div>
          <div style={styles.divider}></div>
          <div style={styles.summaryTotal}>
            <span>Total à payer</span>
            <span style={styles.totalValue}>{subtotal.toFixed(0)} FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '40px', maxWidth: '1200px', margin: '40px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif', alignItems: 'flex-start' },
  empty: { textAlign: 'center', padding: '60px', color: '#888', fontSize: '18px', width: '100%' },
  successContainer: { textAlign: 'center', padding: '100px 20px', width: '100%' },
  formSection: { flex: 2 },
  title: { fontSize: '28px', fontWeight: '300', marginBottom: '30px', color: '#111' },
  form: { display: 'flex', flexDirection: 'column', gap: '25px' },
  card: { background: 'white', border: '1px solid #eee', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' },
  cardTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#111' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' },
  label: { fontSize: '13px', fontWeight: '500', color: '#555' },
  input: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', background: '#fcfcfc', width: '100%', boxSizing: 'border-box' },
  submitBtn: { background: '#111', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', width: '100%' },
  summarySection: { flex: 1, minWidth: '320px', position: 'sticky', top: '100px' },
  summaryCard: { background: '#fafafa', borderRadius: '12px', padding: '25px' },
  summaryTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#111' },
  summaryItems: { display: 'flex', flexDirection: 'column', gap: '15px' },
  summaryItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  summaryItemInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
  summaryImg: { width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' },
  summaryItemName: { fontSize: '14px', fontWeight: '500', color: '#111' },
  summaryItemQty: { fontSize: '12px', color: '#888' },
  summaryItemPrice: { fontSize: '14px', fontWeight: '600', color: '#111' },
  divider: { height: '1px', background: '#ddd', margin: '20px 0' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: '600', color: '#111' },
  totalValue: { fontSize: '20px', fontWeight: '700' }
};

export default Checkout;
