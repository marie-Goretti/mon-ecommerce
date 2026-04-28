import { useState, useEffect } from 'react';
import { getUserOrders } from '../api';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useApp();

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await getUserOrders();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'En attente': return '#f39c12';
      case 'Expédiée': return '#3498db';
      case 'Livrée': return '#2ecc71';
      case 'Annulée': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  if (!user) return <div style={styles.empty}>Connectez-vous pour voir vos commandes.</div>;
  if (loading) return <div style={styles.empty}>Chargement...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>VOS COMMANDES</h1>
      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>Vous n'avez passé aucune commande.</p>
          <Link to="/shop" style={styles.shopBtn}>CONTINUER VOS ACHATS</Link>
        </div>
      ) : (
        <div style={styles.list}>
          {orders.map(order => (
            <div key={order.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.orderId}>Commande #{order.id}</span>
                <span style={{ ...styles.badge, backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </span>
              </div>
              <div style={styles.body}>
                <p><strong>Date :</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                <p><strong>Total :</strong> <span style={styles.price}>{parseFloat(order.total_amount).toFixed(0)} FCFA</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '40px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif' },
  pageTitle: { fontSize: '28px', fontWeight: '300', marginBottom: '40px', color: '#111', letterSpacing: '1px' },
  empty: { textAlign: 'center', padding: '60px', color: '#888', fontSize: '18px' },
  shopBtn: { display: 'inline-block', marginTop: '20px', padding: '12px 24px', background: '#111', color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', transition: 'background 0.2s' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { padding: '24px', border: '1px solid #eee', borderRadius: '4px', background: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #f9f9f9', paddingBottom: '15px' },
  orderId: { fontSize: '18px', fontWeight: '600', color: '#111' },
  badge: { padding: '6px 14px', borderRadius: '4px', color: 'white', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' },
  body: { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#555' },
  price: { fontSize: '16px', fontWeight: '700', color: '#111' }
};

export default Orders;
