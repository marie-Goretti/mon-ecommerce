import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

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
    } catch (error) {
      alert("Erreur lors de la mise à jour du statut");
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
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="En attente">En attente</option>
                    <option value="Expédiée">Expédiée</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
