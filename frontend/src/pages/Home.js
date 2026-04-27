import { useState, useEffect } from 'react';
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
  const [categoriesList, setCategoriesList] = useState(['All Products']);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All Products');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategoriesList(['All Products', ...res.data.map(cat => cat.name)]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      // Handle the "Tous" matching from previous logic if needed, but let's use English now
      if (category !== 'All Products') params.category = category;
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
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Discover Your Perfect<br/>Space</h1>
          <p style={styles.heroSub}>Explore our curated collection of elegant, contemporary pieces designed to elevate your living space.</p>
        </div>
        <img src={HeroSofa} alt="Hero Sofa" style={styles.heroImage} />
        {/* Curved cutout effect placeholder */}
        <div style={styles.heroCutout}></div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><ShoppingBag size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>Easy For Shopping</p>
        </div>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><Truck size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>Fast & Free Shipping</p>
        </div>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><Headphones size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>24/7 Support</p>
        </div>
        <div style={styles.featureBox}>
          <div style={styles.featureIcon}><ShieldCheck size={24} color="var(--primary)" /></div>
          <p style={styles.featureText}>Money Back Guarantee</p>
        </div>
      </div>

      {/* Ideas & Inspiration Section */}
      <div style={styles.ideasSection}>
        <div style={styles.ideasImageContainer}>
          <img src={FurnitureIdea} alt="Furniture Ideas" style={styles.ideasImage} />
        </div>
        <div style={styles.ideasContent}>
          <div style={styles.ideasTag}>FURNITURE DESIGN IDEAS</div>
          <h2 style={styles.ideasTitle}>Create the living room of your dreams</h2>
          <p style={styles.ideasDesc}>Explore Athena's curated collection of mid-century contemporary pieces designed to create luxury and functional living spaces.</p>
          <div style={styles.ideasLinks}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Shop Now <ArrowRight size={16} />
            </button>
            <a href="#instagram" style={styles.ideasLink}>Follow Instagram</a>
          </div>
        </div>
      </div>

      {/* Categories Layout */}
      <div style={styles.categoriesLayout}>
        <div style={styles.catCol}>
          <div style={styles.catCard}>
            <div style={styles.catText}>
              <h3>Table</h3>
              <p>Dining table</p>
              <p>Coffee table</p>
              <a href="#view">View All →</a>
            </div>
            <img src={TableImg} alt="Table" style={styles.catImage} />
          </div>
          <div style={{...styles.catCard, background: '#fdf1e4'}}>
            <div style={styles.catText}>
              <h3>Light</h3>
              <p>Chandelier</p>
              <p>Pendant light</p>
              <a href="#view">View All →</a>
            </div>
            <img src={LightImg} alt="Light" style={styles.catImageSmall} />
          </div>
        </div>
        
        <div style={{...styles.catCol, justifyContent: 'space-between'}}>
          <div style={{...styles.catCard, height: '65%', background: '#f4f6f8', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3 style={{marginBottom: '10px'}}>Chairs</h3>
            <img src={ChairImg} alt="Chair" style={{width: '60%', objectFit: 'contain'}} />
            <a href="#view" style={{marginTop: '15px'}}>View All →</a>
          </div>
          <div style={{...styles.catCard, height: '30%', background: 'var(--primary)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
             <div style={{background: 'var(--accent)', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px'}}>GET DISCOUNT</div>
             <h3 style={{fontSize: '24px'}}>30% OFFER</h3>
          </div>
        </div>
      </div>

      {/* Best Selling Products */}
      <div style={styles.bestSelling}>
        <div style={styles.bestSellingHeader}>
          <h2 style={styles.sectionTitle}>Our Best Selling<br/>Product</h2>
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
    background: 'var(--primary)',
    borderRadius: '24px',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '40px 60px'
  },
  heroContent: {
    flex: 1,
    zIndex: 2,
    color: 'white'
  },
  heroTitle: {
    fontSize: '48px',
    lineHeight: '1.2',
    fontWeight: '700',
    marginBottom: '20px'
  },
  heroSub: {
    color: '#e0e0e0',
    fontSize: '16px',
    maxWidth: '400px',
    lineHeight: '1.5'
  },
  heroImage: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '55%',
    objectFit: 'cover',
    zIndex: 1,
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  },
  heroCutout: {
    position: 'absolute',
    bottom: '-50px',
    right: '20%',
    width: '200px',
    height: '100px',
    background: 'var(--bg-color)',
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    zIndex: 3
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
    height: '500px'
  },
  catCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    height: '100%'
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