import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <h3 style={styles.title}>Athena</h3>
          <p style={styles.text}>
            Votre destination pour des meubles modernes et élégants. Redéfinissez votre espace intérieur avec notre collection exclusive.
          </p>
        </div>
        
        <div style={styles.column}>
          <h4 style={styles.subtitle}>Liens Rapides</h4>
          <Link to="/" style={styles.link}>Accueil</Link>
          <Link to="/shop" style={styles.link}>Boutique</Link>
          <Link to="/about" style={styles.link}>À propos</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>

        <div style={styles.column}>
          <h4 style={styles.subtitle}>Service Client</h4>
          <Link to="/faq" style={styles.link}>FAQ</Link>
          <Link to="/shipping" style={styles.link}>Livraison & Retours</Link>
          <Link to="/terms" style={styles.link}>Conditions générales</Link>
          <Link to="/privacy" style={styles.link}>Politique de confidentialité</Link>
        </div>
        
        <div style={styles.column}>
          <h4 style={styles.subtitle}>Contact</h4>
          <p style={styles.text}>Email: contact@athena.com</p>
          <p style={styles.text}>Téléphone: +33 1 23 45 67 89</p>
          <div style={styles.socials}>
            <a href="#instagram" style={styles.socialLink}>Instagram</a>
            <a href="#facebook" style={styles.socialLink}>Facebook</a>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>© {new Date().getFullYear()} Athena. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#163a4a', // Dark blue background of the site
    color: '#aed1d6', // Light text color matching the hero section
    padding: '60px 20px 20px 20px',
    marginTop: '80px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: '800',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.6',
  },
  link: {
    color: '#aed1d6',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  socials: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  socialLink: {
    color: '#fff',
    textDecoration: 'underline',
    fontSize: '14px',
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '13px',
    color: 'rgba(174, 209, 214, 0.6)',
  }
};

export default Footer;
