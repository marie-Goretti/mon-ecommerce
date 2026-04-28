import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { createOrder } from '../api';
import { CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

function Checkout() {
  const { cart, fetchCart, user } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [address, setAddress] = useState({
    name: user?.name || '',
    street: '',
    city: '',
    postalCode: '',
  });

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const today = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await createOrder();
      await fetchCart();
      setSuccess(true);
      setTimeout(() => navigate('/orders'), 2000);
    } catch (err) {
      alert('Erreur lors de la création de la commande');
      setLoading(false);
    }
  };

  if (!user)
    return <p style={styles.empty}>Connectez-vous pour finaliser votre commande</p>;
  if (cart.length === 0 && !success)
    return <p style={styles.empty}>Votre panier est vide</p>;

  if (success) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successIcon}>
          <ShieldCheck size={36} color="#fff" />
        </div>
        <h2 style={styles.successTitle}>Paiement réussi</h2>
        <p style={styles.successSub}>
          Merci pour votre commande. Vous allez être redirigé vers vos commandes...
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.pageInner} className="mobile-col">

        {/* ── Formulaire ── */}
        <div style={styles.formSection} className="mobile-w-100">
          <h1 style={styles.pageTitle}>Finaliser la commande</h1>

          <form onSubmit={handleSubmit} style={styles.form}>

            {/* Livraison */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardIconWrap}>
                  <Truck size={18} color="#163a4a" />
                </div>
                <h2 style={styles.cardTitle}>Adresse de livraison</h2>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Nom complet</label>
                <input
                  type="text"
                  style={styles.input}
                  required
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Adresse</label>
                <input
                  type="text"
                  style={styles.input}
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: '16px' }} className="mobile-col">
                <div style={{ ...styles.inputGroup, flex: 2 }}>
                  <label style={styles.label}>Ville</label>
                  <input
                    type="text"
                    style={styles.input}
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>Code postal</label>
                  <input
                    type="text"
                    style={styles.input}
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Paiement */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardIconWrap}>
                  <CreditCard size={18} color="#163a4a" />
                </div>
                <h2 style={styles.cardTitle}>Paiement sécurisé</h2>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Numéro de carte</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  style={styles.input}
                  required
                  value={payment.cardNumber}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: '16px' }} className="mobile-col">
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>Expiration</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    style={styles.input}
                    required
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                  />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    style={styles.input}
                    required
                    value={payment.cvc}
                    onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Traitement en cours...' : `Payer ${subtotal.toFixed(0)} FCFA`}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>

        {/* ── Récapitulatif ── */}
        <div style={styles.summarySection} className="mobile-w-100">
          <div style={styles.summaryCard}>

            <div style={styles.summaryHeader}>
              <h2 style={styles.summaryTitle}>Récapitulatif</h2>
              <span style={styles.summaryDate}>{today}</span>
            </div>

            {/* Articles */}
            <div style={styles.itemsList}>
              {cart.map((item) => (
                <div key={item.id} style={styles.summaryItem}>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={styles.summaryImg}
                  />
                  <div style={styles.summaryItemBody}>
                    <div style={styles.summaryItemName}>{item.name}</div>
                    <div style={styles.summaryItemQty}>Qté : {item.quantity}</div>
                  </div>
                  <div style={styles.summaryItemPrice}>
                    {(parseFloat(item.price) * item.quantity).toFixed(0)} FCFA
                  </div>
                </div>
              ))}
            </div>

            {/* Détail commande */}
            <div style={styles.detailBlock}>
              <div style={styles.detailBlockTitle}>Détail de la commande</div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Sous-total</span>
                <span style={styles.detailValue}>{subtotal.toFixed(0)} FCFA</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Livraison</span>
                <span style={{ ...styles.detailValue, color: '#163a4a', fontWeight: 600 }}>
                  Gratuite
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Taxes</span>
                <span style={styles.detailValue}>Incluses</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Articles</span>
                <span style={styles.detailValue}>
                  {cart.reduce((acc, i) => acc + i.quantity, 0)} article
                  {cart.reduce((acc, i) => acc + i.quantity, 0) > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Total */}
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total à payer</span>
              <span style={styles.totalValue}>{subtotal.toFixed(0)} FCFA</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    background: '#f4f6f8',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Inter, sans-serif',
  },
  pageInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  },
  empty: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#6b8290',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif',
  },

  /* Success */
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '20px',
    fontFamily: 'Inter, sans-serif',
  },
  successIcon: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: '#163a4a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a2e38',
  },
  successSub: {
    color: '#6b8290',
    fontSize: '15px',
    textAlign: 'center',
    maxWidth: '360px',
  },

  /* Layout */
  formSection: { flex: 2 },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a2e38',
    marginBottom: '28px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },

  /* Cards formulaire */
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 4px 15px rgba(22,58,74,0.04)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '22px',
  },
  cardIconWrap: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: 'rgba(22,58,74,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1a2e38',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '14px',
  },
  label: { fontSize: '13px', fontWeight: '500', color: '#6b8290' },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(22,58,74,0.15)',
    fontSize: '14px',
    outline: 'none',
    background: '#f4f6f8',
    width: '100%',
    boxSizing: 'border-box',
    color: '#1a2e38',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: '#163a4a',
    color: '#fff',
    border: 'none',
    padding: '15px 24px',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.2s',
  },

  /* Récapitulatif */
  summarySection: {
    flex: 1,
    minWidth: '300px',
    position: 'sticky',
    top: '100px',
  },
  summaryCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 4px 15px rgba(22,58,74,0.04)',
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '22px',
  },
  summaryTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1a2e38',
  },
  summaryDate: {
    fontSize: '12px',
    color: '#6b8290',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '22px',
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  summaryImg: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  summaryItemBody: { flex: 1 },
  summaryItemName: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#1a2e38',
    marginBottom: '2px',
  },
  summaryItemQty: { fontSize: '12px', color: '#6b8290' },
  summaryItemPrice: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a2e38',
    whiteSpace: 'nowrap',
  },

  /* Détail commande */
  detailBlock: {
    background: '#f4f6f8',
    borderRadius: '14px',
    padding: '16px 18px',
    marginBottom: '18px',
  },
  detailBlockTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#163a4a',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '12px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  detailLabel: { fontSize: '13px', color: '#6b8290' },
  detailValue: { fontSize: '13px', fontWeight: '500', color: '#1a2e38' },

  /* Total */
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid rgba(22,58,74,0.08)',
  },
  totalLabel: { fontSize: '15px', fontWeight: '600', color: '#1a2e38' },
  totalValue: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#163a4a',
  },
};

export default Checkout;