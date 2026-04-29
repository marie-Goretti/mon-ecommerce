import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, getOrderDetails } from '../../api';
import { Eye, X } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, { status: newStatus });
      fetchOrders();
      if (selectedOrder && selectedOrder.order.id === id) {
        setSelectedOrder({
          ...selectedOrder,
          order: { ...selectedOrder.order, status: newStatus }
        });
      }
    } catch (error) {
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const res = await getOrderDetails(id);
      setSelectedOrder(res.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails", error);
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

  return (
    <div>
      <div className="admin-header">
        <h1>Gestion des Commandes</h1>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  {order.user_name}<br/>
                  <small style={{color: '#888'}}>{order.user_email}</small>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>{parseFloat(order.total_amount).toFixed(0)} FCFA</td>
                <td>
                  <span style={{
                    padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: 'white',
                    backgroundColor: getStatusColor(order.status)
                  }}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleViewDetail(order.id)} style={styles.detailBtn}>
                    <Eye size={16} /> Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Détails de la Commande #{selectedOrder.order.id}</h2>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeBtn}><X size={24} /></button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.infoGrid}>
                <div>
                  <strong>Date :</strong> <br/>{new Date(selectedOrder.order.created_at).toLocaleString()}
                </div>
                <div>
                  <strong>Client :</strong> <br/>{selectedOrder.order.user_name || 'Client'}
                </div>
                <div>
                  <strong>Total :</strong> <br/><span style={{ fontSize: '18px', fontWeight: 'bold' }}>{parseFloat(selectedOrder.order.total_amount).toFixed(0)} FCFA</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <strong>Statut :</strong>
                  <select 
                    value={selectedOrder.order.status} 
                    onChange={(e) => handleStatusChange(selectedOrder.order.id, e.target.value)}
                    style={styles.statusSelect}
                  >
                    <option value="En attente">En attente</option>
                    <option value="Expédiée">Expédiée</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                </div>
              </div>

              <h3 style={{ marginTop: '20px', marginBottom: '15px', fontSize: '18px', color: '#111' }}>Articles Commandés ({selectedOrder.items.length})</h3>
              <div style={styles.itemsList}>
                {selectedOrder.items.map(item => (
                  <div key={item.id} style={styles.itemCard}>
                    <img src={item.image_url} alt={item.name} style={styles.itemImage} />
                    <div style={styles.itemInfo}>
                      <p style={styles.itemName}>{item.name}</p>
                      <p style={styles.itemPrice}>Qté: {item.quantity} × {parseFloat(item.price_at_purchase).toFixed(0)} FCFA</p>
                    </div>
                    <div style={styles.itemTotal}>
                      {(item.quantity * parseFloat(item.price_at_purchase)).toFixed(0)} FCFA
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  detailBtn: { display: 'flex', alignItems: 'center', gap: '5px', background: '#f8f9fa', border: '1px solid #ddd', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: '#111', fontSize: '13px', fontWeight: '600' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { background: 'white', padding: '30px', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#888' },
  modalBody: { display: 'flex', flexDirection: 'column' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: '#f8f9fa', padding: '20px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' },
  statusSelect: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', width: '100%', maxWidth: '150px', fontWeight: 'bold' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  itemCard: { display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '6px' },
  itemImage: { width: '50px', height: '50px', objectFit: 'contain', background: '#f8f9fa', borderRadius: '4px' },
  itemInfo: { flex: 1 },
  itemName: { margin: 0, fontWeight: '600', color: '#111', fontSize: '14px' },
  itemPrice: { margin: '4px 0 0', color: '#666', fontSize: '13px' },
  itemTotal: { fontWeight: '700', color: '#111' }
};

export default AdminOrders;
