import { useState, useEffect } from 'react';
import { getProducts, getCategories, getUsers, getAllOrders } from '../../api';
import { ArrowUpRight, Plus, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, categories: 0, users: 0, orders: 0 });
  const [latestUsers, setLatestUsers] = useState([]); 
  const [pendingOrders, setPendingOrders] = useState([]); 


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes, userRes, orderRes] = await Promise.all([
          getProducts(),
          getCategories(),
          getUsers(),
          getAllOrders()
        ]);
        
        const deliveredOrders = orderRes.data.filter(o => o.status === 'Livrée');
        const pending = orderRes.data.filter(o => o.status === 'En attente');
        
        setStats({
          products: prodRes.data.length,
          categories: catRes.data.length,
          users: userRes.data.length,
          orders: deliveredOrders.length
        });
        setLatestUsers(userRes.data.slice(0, 5)); 
        setPendingOrders(pending); 
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Tableau de bord</h1>
          <p>Gérez, analysez et développez votre boutique facilement.</p>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <div className="stat-card primary-card">
          <div className="stat-card-top">
            <h3>Total Produits</h3>
            <button className="stat-icon-btn" onClick={() => navigate('/admin/products')}><ArrowUpRight size={14} /></button>
          </div>
          <h2>{stats.products}</h2>
          <div className="stat-card-bottom">
            <span className="badge-increase">+5</span> Augmentation ce mois
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <h3>Commandes Livrées</h3>
            <button className="stat-icon-btn" onClick={() => navigate('/admin/orders')}><ArrowUpRight size={14} /></button>
          </div>
          <h2>{stats.orders}</h2>
          <div className="stat-card-bottom">
            <span className="badge-increase">+2</span> Augmentation ce mois
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <h3>Utilisateurs</h3>
            <button className="stat-icon-btn" onClick={() => navigate('/admin/users')}><ArrowUpRight size={14} /></button>
          </div>
          <h2>{stats.users}</h2>
          <div className="stat-card-bottom">
            <span className="badge-increase">+12</span> Augmentation ce mois
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <h3>Catégories</h3>
            <button className="stat-icon-btn" onClick={() => navigate('/admin/categories')}><ArrowUpRight size={14} /></button>
          </div>
          <h2>{stats.categories}</h2>
          <div className="stat-card-bottom">
            <span className="badge-neutral">En ligne</span>
          </div>
        </div>
      </div>

      <div className="dashboard-middle-grid">
        <div className="analytics-section">
          <h3>Analyse des Ventes</h3>
          <div className="css-bar-chart">
            <div className="bar-wrapper"><div className="bar val-40"></div><span>L</span></div>
            <div className="bar-wrapper"><div className="bar val-70"></div><span>M</span></div>
            <div className="bar-wrapper"><div className="bar val-100 highlight"></div><span>M</span></div>
            <div className="bar-wrapper"><div className="bar val-50"></div><span>J</span></div>
            <div className="bar-wrapper"><div className="bar val-80"></div><span>V</span></div>
            <div className="bar-wrapper"><div className="bar val-30"></div><span>S</span></div>
            <div className="bar-wrapper"><div className="bar val-60"></div><span>D</span></div>
          </div>
        </div>

        <div className="reminders-section">
          <h3>Rappels</h3>
          <div className="reminders-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {pendingOrders.length > 0 ? (
              pendingOrders.map(order => (
                <div key={order.id} className="reminder-card" style={{ marginBottom: '10px' }}>
                  <h4>Préparer Commande #{order.id}</h4>
                  <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                  <button className="btn-meeting" onClick={() => navigate('/admin/orders')}><Play size={16} /> Gérer la commande</button>
                </div>
              ))
            ) : (
              <p style={{ color: '#888', fontSize: '14px', marginTop: '15px' }}>Aucune commande en attente.</p>
            )}
          </div>
        </div>

        <div className="progress-section">
          <h3>Objectif Mensuel</h3>
          <div className="circular-progress">
            <div className="inner-circle">
              <h2>41%</h2>
              <p>Atteint</p>
            </div>
          </div>
          <div className="progress-legend">
            <span><span className="dot dot-green"></span> Complété</span>
            <span><span className="dot dot-orange"></span> En cours</span>
          </div>
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        <div className="team-section">
          <div className="section-header">
            <h3>Derniers Utilisateurs</h3>
            <button className="btn-add-member">+ Ajouter Membre</button>
          </div>
          <div className="team-list">
            {latestUsers.map((u, index) => (
              <div className="team-member" key={u.id}>
                <div 
                  className="member-avatar" 
                  style={{ background: index % 2 === 0 ? '#163a4a' : '#f09653' }}
                >
                  {u.name?.charAt(0).toUpperCase()}
                </div>
                <div className="member-info">
                  <h4>{u.name}</h4>
                  <p>{u.email}</p>
                </div>
                <span className={`status-badge ${u.role === 'admin' ? 'status-progress' : 'status-completed'}`}>
                  {u.role === 'admin' ? 'Admin' : 'Vérifié'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
