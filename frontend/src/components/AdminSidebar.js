import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Produits', path: '/admin/products' },
    { name: 'Catégories', path: '/admin/categories' },
    { name: 'Utilisateurs', path: '/admin/users' },
    { name: 'Commandes', path: '/admin/orders' },
  ];

  return (
    <div className="admin-sidebar">
      <h3>Administration</h3>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link 
              to={link.path} 
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
