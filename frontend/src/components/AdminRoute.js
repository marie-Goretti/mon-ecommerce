import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminRoute = ({ children }) => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
