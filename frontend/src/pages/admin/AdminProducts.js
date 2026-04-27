import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '../../api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        category_id: product.category_id || '',
        image_url: product.image_url || '',
        stock: product.stock || 0
      });
    } else {
      setFormData({ name: '', description: '', price: '', category_id: '', image_url: '', stock: 0 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      alert("Erreur lors de l'enregistrement du produit");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Gestion des Produits</h1>
        <button className="admin-btn" onClick={() => handleOpenModal()}>+ Nouveau Produit</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Catégorie</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>
                  <img src={prod.image_url} alt={prod.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td>{prod.name}</td>
                <td>{prod.price} €</td>
                <td>{prod.category}</td>
                <td>{prod.stock}</td>
                <td className="admin-actions">
                  <button className="admin-btn" onClick={() => handleOpenModal(prod)}>Modifier</button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(prod.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingProduct ? 'Modifier le produit' : 'Nouveau produit'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
              <input type="number" name="price" placeholder="Prix" value={formData.price} onChange={handleChange} required />
              <select name="category_id" value={formData.category_id} onChange={handleChange} required>
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input type="text" name="image_url" placeholder="URL de l'image" value={formData.image_url} onChange={handleChange} required />
              {formData.image_url && (
                <div style={{ marginTop: '10px' }}>
                  <img src={formData.image_url} alt="Aperçu" style={{ width: '100px', borderRadius: '4px', objectFit: 'cover' }} />
                </div>
              )}
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
              
              <div className="modal-actions">
                <button type="button" className="admin-btn" onClick={handleCloseModal}>Annuler</button>
                <button type="submit" className="admin-btn">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
