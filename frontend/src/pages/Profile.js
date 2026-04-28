import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logoutUser } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>MON PROFIL</h1>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.email}>{user.email}</p>
        <span style={styles.roleBadge}>{user.role === 'admin' ? 'Administrateur' : 'Client'}</span>
        
        <div style={styles.divider}></div>
        
        <button onClick={handleLogout} style={styles.logoutBtn}>Se déconnecter</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '60px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif' },
  pageTitle: { fontSize: '28px', fontWeight: '300', marginBottom: '40px', color: '#111', letterSpacing: '1px', textAlign: 'center' },
  card: { background: 'white', padding: '40px', borderRadius: '4px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', background: '#111', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: '600', marginBottom: '20px' },
  name: { fontSize: '24px', fontWeight: '600', color: '#111', margin: '0 0 10px 0' },
  email: { fontSize: '15px', color: '#666', margin: '0 0 20px 0' },
  roleBadge: { padding: '6px 14px', borderRadius: '4px', background: '#f8f9fa', color: '#111', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', border: '1px solid #eee' },
  divider: { width: '100%', height: '1px', background: '#eee', margin: '30px 0' },
  logoutBtn: { width: '100%', padding: '14px', background: 'transparent', color: '#d32f2f', border: '1px solid #d32f2f', borderRadius: '4px', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.2s' }
};

export default Profile;
