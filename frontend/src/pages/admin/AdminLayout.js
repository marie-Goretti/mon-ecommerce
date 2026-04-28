import { Outlet } from 'react-router-dom';
import { Search, Bell, Mail } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-search">
            <Search size={18} color="#888" />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <div className="admin-topbar-icons">
            <button className="topbar-icon-btn"><Mail size={18} /></button>
            <button className="topbar-icon-btn"><Bell size={18} /></button>
            <div className="topbar-profile">
              <div className="topbar-avatar">A</div>
              <div className="topbar-user-info">
                <span className="topbar-name">Administrateur</span>
                <span className="topbar-email">admin@athena.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
