import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../api';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, Truck, Headphones, ShieldCheck, ArrowRight } from 'lucide-react';

// Images
import HeroSofa from '../assets/hero_sofa_1777291885308.png';
import FurnitureIdea from '../assets/furniture_idea_1777292086100.png';
import TableImg from '../assets/table_category_1777292302689.png';
import ChairImg from '../assets/chair_category_1777292545339.png';
import LightImg from '../assets/light_category_1777292658502.png';

function Home() {
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState(['Tous les produits']);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Tous les produits');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategoriesList(['Tous les produits', ...res.data.map(cat => cat.name)]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      // Handle the "Tous" matching
      if (category !== 'Tous les produits') params.category = category;
      const res = await getProducts(params);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Hero Section */}
      <div style={{ ...styles.hero, backgroundImage: `url(${HeroSofa})` }} className="mobile-hero-bg">
        <div style={styles.heroContent} className="mobile-hero-content">
          <div style={styles.heroTag}>IDÉES DE DESIGN DE MEUBLES</div>
          <h1 style={styles.heroTitle} className="mobile-hero-title">Découvrez Votre<br/>Espace Idéal</h1>
          <p style={styles.heroSub}>Choisir les bons meubles pour votre maison ajoutera élégance et fonctionnalité à votre intérieur, tout en reflétant votre style unique.</p>
          
          <div style={styles.heroActions}>
            <Link to="/shop" style={styles.shopNowBtn}>Acheter</Link>
            <a href="#instagram" style={styles.instaBtn}>Suivre Instagram</a>
          </div>

          <div style={styles.heroStats} className="mobile-wrap mobile-gap-20">
            <div>
              <div style={styles.statNumber}>2500+</div>
              <div style={styles.statLabel}>Styles Uniques</div>
            </div>
            <div>
              <div style={styles.statNumber}>5000+</div>
              <div style={styles.statLabel}>Clients Heureux</div>
            </div>
            <div>
              <div style={styles.statNumber}>300+</div>
              <div style={styles.statLabel}>Boutiques Certifiées</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><ShoppingBag size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>Achats Faciles</p>
        </div>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><Truck size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>Livraison Rapide & Gratuite</p>
        </div>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><Headphones size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>Support 24/7</p>
        </div>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><ShieldCheck size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>Satisfait ou Remboursé</p>
        </div>
      </div>

      {/* Ideas & Inspiration Section */}
      <div style={styles.ideasSection} className="mobile-col">
        <div style={styles.ideasImageContainer}>
          <img src={FurnitureIdea} alt="Furniture Ideas" style={styles.ideasImage} />
        </div>
        <div style={styles.ideasContent}>
          <div style={styles.ideasTag}>IDÉES DE DÉCORATION</div>
          <h2 style={styles.ideasTitle}>Créez le salon de vos rêves</h2>
          <p style={styles.ideasDesc}>Explorez la collection d'Athena pour créer des espaces de vie luxueux et fonctionnels.</p>
          <div style={styles.ideasLinks}>
            <Link to="/shop" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'max-content' }}>
              Acheter <ArrowRight size={16} />
            </Link>
            <a href="#instagram" style={styles.ideasLink}>Suivre sur Instagram</a>
          </div>
        </div>
      </div>

      {/* Categories Layout */}
      <div style={styles.categoriesLayout} className="mobile-grid-1">
        <div style={styles.catCol}>
          <div style={styles.catCard}>
            <div style={styles.catText}>
              <h3>Tables</h3>
              <p>Table à manger</p>
              <p>Table basse</p>
              <Link to="/shop" style={styles.catLink}>Voir Tout →</Link>
            </div>
            <img src={TableImg} alt="Table" style={styles.catImage} />
          </div>
          <div style={{...styles.catCard, background: '#fdf1e4'}}>
            <div style={styles.catText}>
              <h3>Luminaires</h3>
              <p>Lustres</p>
              <p>Lampes suspendues</p>
              <Link to="/shop" style={styles.catLink}>Voir Tout →</Link>
            </div>
            <img src={LightImg} alt="Light" style={styles.catImageSmall} />
          </div>
        </div>
        
        <div style={styles.catCol}>
          <div style={{...styles.catCard, flex: 2, background: '#f4f6f8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{marginBottom: '10px'}}>Chaises</h3>
            <img src={ChairImg} alt="Chair" style={{height: '200px', objectFit: 'contain', margin: '20px 0'}} />
            <Link to="/shop" style={styles.catLink}>Voir Tout →</Link>
          </div>
          <div style={{...styles.catCard, flex: 1, background: 'var(--primary)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
             <div style={{background: 'var(--accent)', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px'}}>PROMOTION</div>
             <h3 style={{fontSize: '24px'}}>-30% DE RÉDUCTION</h3>
          </div>
        </div>
      </div>

      {/* Best Selling Products */}
      <div style={styles.bestSelling}>
        <div style={styles.bestSellingHeader}>
          <h2 style={styles.sectionTitle}>Nos Meilleures<br/>Ventes</h2>
        </div>
        
        {/* Categories Tabs */}
        <div style={styles.tabs}>
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                ...styles.tabBtn,
                background: category === cat ? 'var(--primary)' : '#fff',
                color: category === cat ? 'white' : 'var(--text-dark)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <p style={styles.loading}>Chargement...</p>
        ) : products.length === 0 ? (
          <p style={styles.loading}>Aucun produit trouvé</p>
        ) : (
          <div style={styles.grid}>
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

const styles = {
  container: { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '80px'
  },
  hero: {
    background: '#163a4a', // Dark blue background fallback
    backgroundSize: 'cover',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '24px',
    minHeight: '450px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    zIndex: 2,
    color: 'white',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '60%'
  },
  heroTag: {
    background: 'rgba(255,255,255,0.1)',
    color: '#aed1d6',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1px',
    width: 'fit-content',
    marginBottom: '20px'
  },
  heroTitle: {
    fontSize: '44px',
    lineHeight: '1.2',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#fff'
  },
  heroSub: {
    color: '#aed1d6',
    fontSize: '15px',
    maxWidth: '450px',
    lineHeight: '1.6',
    marginBottom: '30px'
  },
  heroActions: {
    display: 'flex',
    gap: '15px',
    marginBottom: '40px'
  },
  shopNowBtn: {
    background: '#eab308', // Yellow/orange button
    color: '#163a4a',
    padding: '12px 24px',
    borderRadius: '30px',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '14px'
  },
  instaBtn: {
    background: '#f87171', // Reddish button
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '30px',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '14px'
  },
  heroStats: {
    display: 'flex',
    gap: '40px'
  },
  statNumber: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#aed1d6'
  },

  features: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'wrap'
  },
  featureBox: {
    flex: 1,
    minWidth: '200px',
    background: 'white',
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
    textAlign: 'center'
  },
  featureIcon: {
    background: '#e8f0f2',
    padding: '16px',
    borderRadius: '50%'
  },
  featureText: {
    fontWeight: '600',
    fontSize: '14px',
    color: 'var(--text-dark)'
  },
  ideasSection: {
    display: 'flex',
    gap: '50px',
    alignItems: 'center'
  },
  ideasImageContainer: {
    flex: 1
  },
  ideasImage: {
    width: '100%',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },
  ideasContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  ideasTag: {
    background: '#e8f0f2',
    color: 'var(--primary)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    width: 'fit-content'
  },
  ideasTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--text-dark)',
    lineHeight: '1.3'
  },
  ideasDesc: {
    color: 'var(--text-light)',
    lineHeight: '1.6',
    fontSize: '15px'
  },
  ideasLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginTop: '10px'
  },
  ideasLink: {
    color: 'var(--text-dark)',
    fontWeight: '600',
    fontSize: '14px',
    textDecoration: 'underline'
  },
  categoriesLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    minHeight: '500px'
  },
  catCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  catCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
    position: 'relative',
    overflow: 'hidden'
  },
  catText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 2
  },
  catImage: {
    width: '50%',
    objectFit: 'contain',
    zIndex: 1
  },
  catImageSmall: {
    width: '40%',
    objectFit: 'contain',
    zIndex: 1
  },
  catLink: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--primary)',
    textDecoration: 'none'
  },
  bestSelling: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  bestSellingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1.2'
  },
  tabs: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '10px'
  },
  tabBtn: {
    padding: '8px 20px',
    borderRadius: '30px',
    border: '1px solid #eaeaea',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '30px'
  },
  loading: { textAlign: 'center', padding: '40px', color: '#888' }
};

export default Home;