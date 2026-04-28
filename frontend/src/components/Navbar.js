import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProducts } from '../api';
import { Search, ShoppingCart, User, Settings, LogOut, Menu, X } from 'lucide-react';

function Navbar() {
  const { user, cart, logoutUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const fetchSearchResults = async () => {
        try {
          const res = await getProducts({ search: searchQuery });
          setSearchResults(res.data.slice(0, 5)); // max 5
        } catch (err) {
          console.error(err);
        }
      };
      const timer = setTimeout(fetchSearchResults, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkStyle = (path) => ({
    ...styles.link,
    fontWeight: isActive(path) ? '700' : '400',
    color: isActive(path) ? 'var(--primary)' : 'var(--text-dark)'
  });

  return (
    <nav style={styles.nav}>
      {/* Left: Logo */}
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logo}>Athena.</Link>
      </div>

      <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Right side wrapper for mobile menu */}
      <div className={`nav-right-container ${isMobileMenuOpen ? 'mobile-nav-menu' : ''}`}>
        
        {/* Middle: Links */}
        <div style={styles.links} className="mobile-nav-links">
          <Link to="/" style={linkStyle('/')} onClick={() => setIsMobileMenuOpen(false)}>Accueil</Link>
          <Link to="/shop" style={linkStyle('/shop')} onClick={() => setIsMobileMenuOpen(false)}>Boutique</Link>
          <Link to="/about" style={linkStyle('/about')} onClick={() => setIsMobileMenuOpen(false)}>À propos</Link>
          <Link to="/checkout" style={linkStyle('/checkout')} onClick={() => setIsMobileMenuOpen(false)}>Checkout</Link>
          {user && <Link to="/orders" style={linkStyle('/orders')} onClick={() => setIsMobileMenuOpen(false)}>Commandes</Link>}
        </div>

      {/* Right: Icons & User Actions */}
      <div style={styles.iconsContainer} className="mobile-nav-icons">
        <div style={styles.searchWrapper} className="mobile-search-wrapper" ref={searchRef}>
          <div style={styles.searchBar} className="mobile-search-bar">
            <Search size={16} style={{ color: '#888' }} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              className="mobile-search-input"
            />
          </div>
          {searchResults.length > 0 && (
            <div style={styles.searchDropdown}>
              <div style={styles.resultsList}>
                {searchResults.map(prod => (
                  <Link key={prod.id} to={`/products/${prod.id}`} style={styles.resultItem} onClick={() => { setSearchResults([]); setSearchQuery(''); }}>
                    <img src={prod.image_url} alt={prod.name} style={styles.resultImg} />
                    <div style={styles.resultInfo}>
                      <div style={styles.resultName}>{prod.name}</div>
                      <div style={styles.resultPrice}>{parseFloat(prod.price).toFixed(0)} FCFA</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {user ? (
          <>
            <Link to="/cart" style={styles.iconWrapper}>
              <ShoppingCart size={20} style={styles.icon} />
              {cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
            </Link>

            {user.role === 'admin' && (
               <Link to="/admin" style={styles.iconWrapper} title="Admin">
                 <Settings size={20} style={{ ...styles.icon, color: '#f09653' }} />
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
            <Link to="/login" style={{ ...styles.link, fontSize: '14px', fontWeight: '500' }}>Se connecter</Link>
            <Link to="/register" className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>S'inscrire</Link>
          </>
        )}
      </div>
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
    letterSpacing: '-0.5px',
    textDecoration: 'none'
  },
  links: {
    display: 'flex',
    gap: '30px',
  },
  link: {
    fontSize: '15px',
    transition: 'color 0.2s',
    textDecoration: 'none'
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
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    background: '#f8f9fa',
    borderRadius: '20px',
    padding: '6px 12px',
    border: '1px solid #eee'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    paddingLeft: '8px',
    fontSize: '14px',
    width: '180px'
  },
  searchDropdown: {
    position: 'absolute',
    top: '40px',
    right: 0,
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: '10px',
    width: '300px',
    zIndex: 1000
  },
  resultsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'background 0.2s',
  },
  resultImg: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    objectFit: 'cover'
  },
  resultInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  resultName: {
    fontSize: '14px',
    fontWeight: '500'
  },
  resultPrice: {
    fontSize: '12px',
    color: 'var(--accent)',
    fontWeight: 'bold'
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
    marginLeft: '10px',
    cursor: 'pointer'
  }
};

export default Navbar;