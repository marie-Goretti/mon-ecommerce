import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Navbar() {
  const { user, cart, logoutUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🛍️ MonShop</Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Produits</Link>

        {user ? (
          <>
            <Link to="/cart" style={styles.link}>
              🛒 Panier {cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
            </Link>
            <span style={styles.username}>👤 {user.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Connexion</Link>
            <Link to="/register" style={styles.registerBtn}>S'inscrire</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '65px',
    background: '#1a1a2e',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'white'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  link: {
    color: 'white',
    fontSize: '15px',
    position: 'relative'
  },
  badge: {
    background: '#e94560',
    borderRadius: '50%',
    padding: '2px 7px',
    fontSize: '11px',
    marginLeft: '4px'
  },
  username: {
    color: '#a8b2d8',
    fontSize: '14px'
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #e94560',
    color: '#e94560',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '14px'
  },
  registerBtn: {
    background: '#e94560',
    color: 'white',
    padding: '7px 16px',
    borderRadius: '6px',
    fontSize: '14px'
  }
};

export default Navbar;