import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, List, Users, ShoppingBag, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logoutUser } = useApp();

  const menuLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Produits', path: '/admin/products', icon: Box },
    { name: 'Catégories', path: '/admin/categories', icon: List },
    { name: 'Utilisateurs', path: '/admin/users', icon: Users },
    { name: 'Commandes', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <Link to="/admin">Athena.</Link>
      </div>

      <div className="admin-sidebar-section">
        <span className="admin-sidebar-title">MENU</span>
        <ul>
          {menuLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  <Icon size={18} className="sidebar-icon" />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="admin-sidebar-section">
        <span className="admin-sidebar-title">GÉNÉRAL</span>
        <ul>
          <li>
            <Link to="#settings">
              <Settings size={18} className="sidebar-icon" />
              Paramètres
            </Link>
          </li>
          <li>
            <Link to="#help">
              <HelpCircle size={18} className="sidebar-icon" />
              Aide
            </Link>
          </li>
          <li>
            <button className="sidebar-logout" onClick={() => logoutUser()}>
              <LogOut size={18} className="sidebar-icon" />
              Déconnexion
            </button>
          </li>
        </ul>
      </div>

      <div className="admin-sidebar-card">
        <div className="admin-card-icon">A</div>
        <h4>Retourner au site</h4>
        <p>Visitez la boutique publique.</p>
        <Link to="/" className="admin-card-btn">Boutique</Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
