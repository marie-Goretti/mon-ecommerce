import { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../../api';
import { useApp } from '../../context/AppContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useApp();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, { role: newRole });
      fetchUsers();
    } catch (error) {
      alert("Erreur lors de la modification du rôle");
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser.id) {
      alert("Vous ne pouvez pas vous supprimer vous-même.");
      return;
    }
    
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        alert("Erreur lors de la suppression de l'utilisateur");
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Gestion des Utilisateurs</h1>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select 
                    value={u.role || 'user'} 
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    disabled={u.id === currentUser.id}
                    style={{ padding: '5px', borderRadius: '4px' }}
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </td>
                <td className="admin-actions">
                  <button 
                    className="admin-btn admin-btn-danger" 
                    onClick={() => handleDelete(u.id)}
                    disabled={u.id === currentUser.id}
                    style={{ opacity: u.id === currentUser.id ? 0.5 : 1 }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
