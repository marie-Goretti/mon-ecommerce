import { useState, useEffect } from 'react';
import { getProducts, getCategories, getUsers, getAllOrders } from '../../api';
import { ArrowUpRight, Plus, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Lun', ventes: 4000 },
  { name: 'Mar', ventes: 3000 },
  { name: 'Mer', ventes: 2000 },
  { name: 'Jeu', ventes: 2780 },
  { name: 'Ven', ventes: 1890 },
  { name: 'Sam', ventes: 2390 },
  { name: 'Dim', ventes: 3490 },
];

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
          <div style={{ width: '100%', height: 250, marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip cursor={{ fill: '#f8f9fa' }} contentStyle={{ borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="ventes" fill="#111" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="reminders-section">
          <h3>Rappels</h3>
          <div className="reminders-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {pendingOrders.length > 0 ? (
              <>
                {pendingOrders.slice(0, 2).map(order => (
                  <div key={order.id} className="reminder-card" style={{ marginBottom: '10px' }}>
                    <h4>Préparer Commande #{order.id}</h4>
                    <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                {pendingOrders.length > 2 && <p style={{ fontSize: '13px', color: '#666', textAlign: 'center', marginBottom: '10px' }}>+ {pendingOrders.length - 2} autres commandes en attente</p>}
                <button className="btn-meeting" onClick={() => navigate('/admin/orders')} style={{ width: '100%', marginTop: '10px' }}>
                  <Play size={16} /> Gérer les commandes
                </button>
              </>
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
