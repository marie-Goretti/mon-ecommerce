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

  if (!user) return <div style={styles.container}>Connectez-vous pour voir vos commandes.</div>;
  if (loading) return <div style={styles.container}>Chargement...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mes Commandes 📦</h1>
      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>Vous n'avez passé aucune commande.</p>
          <Link to="/" style={styles.shopBtn}>Continuer mes achats</Link>
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
  container: { maxWidth: '800px', margin: '30px auto', padding: '0 20px' },
  title: { fontSize: '26px', marginBottom: '24px', color: '#1a1a2e' },
  empty: { textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  shopBtn: { display: 'inline-block', marginTop: '15px', padding: '10px 20px', background: '#e94560', color: 'white', textDecoration: 'none', borderRadius: '8px' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' },
  orderId: { fontSize: '18px', fontWeight: 'bold', color: '#1a1a2e' },
  badge: { padding: '5px 12px', borderRadius: '20px', color: 'white', fontSize: '14px', fontWeight: 'bold' },
  body: { display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' },
  price: { fontSize: '18px', fontWeight: 'bold', color: '#e94560' }
};

export default Orders;
