import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Package, MessageSquare, ClipboardList, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null; // Si no hay usuario, no mostramos la barra

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Package color="#fff" />
        <span>Almacén Pro</span>
      </div>

      <div style={styles.links}>
        <Link to="/catalogo" style={styles.link}><ClipboardList size={18} /> Catálogo</Link>
        <Link to="/chat" style={styles.link}><MessageSquare size={18} /> Chat</Link>
      </div>

      <div style={styles.userSection}>
        <div style={styles.userInfo}>
          <User size={16} />
          <span>{user.nombre} ({user.rol})</span>
        </div>
        <button onClick={handleLogout} style={styles.btnLogout}>
          <LogOut size={18} /> Salir
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#1e293b', color: 'white' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '20px' },
  link: { color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' },
  userSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', color: '#cbd5e1' },
  btnLogout: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }
};

export default Navbar;