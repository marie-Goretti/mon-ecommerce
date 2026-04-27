import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, ShoppingCart, User, Settings, LogOut } from 'lucide-react';

function Navbar() {
  const { user, cart, logoutUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      {/* Left: Logo */}
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logo}>Athena.</Link>
      </div>

      {/* Middle: Links */}
      <div style={styles.links}>
        <Link to="/" style={{...styles.link, fontWeight: '600'}}>Accueil</Link>
        <Link to="/shop" style={styles.link}>Boutique</Link>
        <Link to="/products" style={styles.link}>Produits</Link>
        <Link to="/about" style={styles.link}>À propos</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/blog" style={styles.link}>Blog</Link>
      </div>

      {/* Right: Icons & User Actions */}
      <div style={styles.iconsContainer}>
        <Search size={20} style={styles.icon} />
        
        {user ? (
          <>
            <Link to="/cart" style={styles.iconWrapper}>
              <ShoppingCart size={20} style={styles.icon} />
              {cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
            </Link>
            
            {user.role === 'admin' && (
              <Link to="/admin" style={styles.iconWrapper} title="Admin">
                <Settings size={20} style={{...styles.icon, color: '#f09653'}} />
              </Link>
            )}
            
            <div style={styles.userInfo}>
              <User size={20} style={styles.icon} />
              <span style={styles.username}>{user.name}</span>
            </div>

            <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{...styles.link, fontSize: '14px', fontWeight: '500'}}>Se connecter</Link>
            <Link to="/register" className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>S'inscrire</Link>
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
    padding: '0 5%',
    height: '80px',
    background: 'var(--bg-color)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid #f0f0f0'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logo: {
    fontFamily: 'Surgena, sans-serif',
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--text-dark)',
    letterSpacing: '-0.5px'
  },
  links: {
    display: 'flex',
    gap: '30px',
    display: window.innerWidth < 768 ? 'none' : 'flex' // Simple responsive hide
  },
  link: {
    color: 'var(--text-dark)',
    fontSize: '15px',
    fontWeight: '400',
    transition: 'color 0.2s'
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  iconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: 'var(--text-dark)',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '10px',
    fontWeight: 'bold'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: '10px'
  },
  username: {
    fontSize: '14px',
    fontWeight: '500'
  },
  logoutBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-light)',
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    marginLeft: '10px'
  }
};

export default Navbar;