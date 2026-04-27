import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../api';
import { useApp } from '../context/AppContext';
import { Truck, RotateCcw } from 'lucide-react';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  const [quantity, setQuantity] = useState(1);

  const { user, fetchCart } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleQuantity = (delta) => {
    setQuantity(prev => {
      const newQ = prev + delta;
      if (newQ < 1) return 1;
      if (product && newQ > product.stock) return product.stock;
      return newQ;
    });
  };

  const handleAddToCart = async () => {
    if (!user) return navigate('/login');
    if (product.stock < quantity) {
      setMessage('❌ Stock insuffisant');
      return;
    }
    try {
      await addToCart({ product_id: product.id, quantity });
      await fetchCart();
      // Decrease local stock
      setProduct({ ...product, stock: product.stock - quantity });
      setQuantity(1); // Reset quantity
      setMessage('✅ Ajouté au panier !');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || 'Erreur'));
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <p style={styles.loading}>Chargement...</p>;
  if (!product) return <p style={styles.loading}>Produit non trouvé</p>;

  return (
    <div style={styles.container}>
      <div style={styles.breadcrumb}>
        Boutique / {product.category || 'Catégorie'} / <strong>{product.name}</strong>
      </div>
      
      <div style={styles.content} className="mobile-col">
        {/* Left side: Images */}
        <div style={styles.gallery} className="mobile-w-100">
          <div style={styles.mainImageContainer}>
            <img src={product.image_url} alt={product.name} style={styles.mainImage} />
          </div>
          <div style={styles.thumbnails}>
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} style={styles.thumbnailBox}>
                <img src={product.image_url} alt="thumbnail" style={styles.thumbnail} />
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Info */}
        <div style={styles.info}>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.description}>
            {product.description || "Un équilibre parfait entre un son haute fidélité exaltant et la magie de l'audio sans effort."}
          </p>
          <div style={styles.rating}>
            ⭐⭐⭐⭐⭐ <span style={{color: '#888', fontSize: '13px'}}>(121)</span>
          </div>

          <div style={styles.priceContainer}>
            <span style={styles.price}>{parseFloat(product.price).toFixed(0)} FCFA</span>
            <span style={styles.priceSub}> ou {parseFloat(product.price/6).toFixed(0)} FCFA/mois</span>
          </div>
          <p style={styles.priceDesc}>Paiements suggérés avec un financement spécial sur 6 mois</p>



          <div style={styles.actionRow} className="mobile-wrap">
            <div style={styles.quantitySelector}>
              <button onClick={() => handleQuantity(-1)} style={styles.qtyBtn}>-</button>
              <span style={styles.qtyValue}>{quantity}</span>
              <button onClick={() => handleQuantity(1)} style={styles.qtyBtn}>+</button>
            </div>
            <div style={styles.stockAlert}>
              <span style={{color: '#f97316', fontWeight: 'bold'}}>Seulement <span style={{color: 'red'}}>{product.stock} articles</span> restants !</span><br/>
              <span style={{color: '#666'}}>Ne le manquez pas</span>
            </div>
          </div>

          {message && <p style={styles.message}>{message}</p>}

          <div style={styles.buttons} className="mobile-wrap">
            <button style={styles.buyNowBtn}>Acheter Maintenant</button>
            <button onClick={handleAddToCart} style={styles.addToCartBtn}>Ajouter au Panier</button>
          </div>

          <div style={styles.deliveryBox}>
            <div style={styles.deliveryRow}>
              <Truck size={24} color="#f97316" />
              <div>
                <p style={styles.deliveryTitle}>Livraison Gratuite</p>
                <p style={styles.deliverySub}>Entrez votre code postal pour voir la disponibilité</p>
              </div>
            </div>
            <div style={styles.deliveryDivider} />
            <div style={styles.deliveryRow}>
              <RotateCcw size={24} color="#f97316" />
              <div>
                <p style={styles.deliveryTitle}>Retours</p>
                <p style={styles.deliverySub}>Retours gratuits sous 30 jours. <a href="#details" style={{textDecoration: 'underline'}}>Détails</a></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '40px auto', padding: '0 20px' },
  loading: { textAlign: 'center', padding: '60px', color: '#888' },
  breadcrumb: { color: '#888', fontSize: '13px', marginBottom: '30px' },
  content: { display: 'flex', gap: '50px', alignItems: 'flex-start' },
  gallery: { flex: '1', minWidth: '400px' },
  mainImageContainer: { background: '#f8f9fa', borderRadius: '16px', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' },
  mainImage: { width: '100%', maxHeight: '400px', objectFit: 'contain' },
  thumbnails: { display: 'flex', gap: '12px' },
  thumbnailBox: { flex: 1, background: '#f8f9fa', borderRadius: '12px', padding: '10px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #eee', cursor: 'pointer' },
  thumbnail: { width: '100%', height: '100%', objectFit: 'contain' },
  info: { flex: '1.2' },
  name: { fontSize: '32px', fontWeight: '800', color: '#111', margin: '0 0 10px 0' },
  description: { fontSize: '14px', color: '#666', lineHeight: '1.5', marginBottom: '12px' },
  rating: { marginBottom: '20px' },
  priceContainer: { display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' },
  price: { fontSize: '24px', fontWeight: '800', color: '#111' },
  priceSub: { fontSize: '16px', fontWeight: '600', color: '#111' },
  priceDesc: { fontSize: '12px', color: '#888', marginBottom: '30px' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#111' },
  actionRow: { display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '30px' },
  quantitySelector: { display: 'flex', alignItems: 'center', background: '#f8f9fa', borderRadius: '30px', padding: '5px 15px', border: '1px solid #eee' },
  qtyBtn: { background: 'none', border: 'none', fontSize: '20px', color: '#111', cursor: 'pointer', padding: '0 10px' },
  qtyValue: { fontSize: '16px', fontWeight: '600', minWidth: '30px', textAlign: 'center' },
  stockAlert: { fontSize: '13px' },
  message: { color: 'red', fontWeight: 'bold', marginBottom: '15px' },
  buttons: { display: 'flex', gap: '15px', marginBottom: '40px' },
  buyNowBtn: { flex: 1, background: '#064e3b', color: 'white', border: 'none', borderRadius: '30px', padding: '15px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
  addToCartBtn: { flex: 1, background: 'white', color: '#111', border: '1px solid #ccc', borderRadius: '30px', padding: '15px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
  deliveryBox: { border: '1px solid #eee', borderRadius: '12px', padding: '20px' },
  deliveryRow: { display: 'flex', gap: '15px', alignItems: 'flex-start' },
  deliveryDivider: { height: '1px', background: '#eee', margin: '20px 0' },
  deliveryTitle: { fontSize: '14px', fontWeight: '600', color: '#111', marginBottom: '4px' },
  deliverySub: { fontSize: '12px', color: '#666' }
};

export default ProductDetail;