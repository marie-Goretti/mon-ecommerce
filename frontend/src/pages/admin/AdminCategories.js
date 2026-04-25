import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (category = null) => {
    setEditingCategory(category);
    setName(category ? category.name : '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { name });
      } else {
        await createCategory({ name });
      }
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      alert("Erreur lors de l'enregistrement de la catégorie");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (error) {
        alert("Impossible de supprimer cette catégorie");
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Gestion des Catégories</h1>
        <button className="admin-btn" onClick={() => handleOpenModal()}>+ Nouvelle Catégorie</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td className="admin-actions">
                  <button className="admin-btn" onClick={() => handleOpenModal(cat)}>Modifier</button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(cat.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Nom de la catégorie" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
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

export default AdminCategories;
