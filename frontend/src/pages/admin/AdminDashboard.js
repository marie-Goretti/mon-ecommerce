import { useState, useEffect } from 'react';
import { getProducts, getCategories, getUsers } from '../../api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, categories: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes, userRes] = await Promise.all([
          getProducts(),
          getCategories(),
          getUsers()
        ]);
        setStats({
          products: prodRes.data.length,
          categories: catRes.data.length,
          users: userRes.data.length
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-info">
            <h3>Total Produits</h3>
            <p>{stats.products}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-info">
            <h3>Catégories</h3>
            <p>{stats.categories}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-info">
            <h3>Utilisateurs</h3>
            <p>{stats.users}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
