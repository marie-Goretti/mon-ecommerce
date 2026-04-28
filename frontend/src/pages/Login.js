import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import { useApp } from '../context/AppContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      loginUser(res.data.user, res.data.token);
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Connexion</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p style={styles.switch}>
          Pas encore de compte ? <Link to="/register" style={styles.linkText}>S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', fontFamily: 'Inter, sans-serif' },
  card: { background: 'white', padding: '40px', borderRadius: '4px', width: '100%', maxWidth: '400px', border: '1px solid #eee' },
  title: { textAlign: 'center', marginBottom: '30px', color: '#111', fontSize: '24px', fontWeight: '300', letterSpacing: '1px', textTransform: 'uppercase' },
  error: { background: '#fff0f0', color: '#d32f2f', padding: '12px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center', fontSize: '13px' },
  input: { width: '100%', padding: '14px 16px', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', outline: 'none', display: 'block', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '16px', background: '#111', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', cursor: 'pointer', transition: 'background 0.2s' },
  switch: { textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '13px' },
  linkText: { color: '#111', fontWeight: '600', textDecoration: 'underline' }
};

export default Login;