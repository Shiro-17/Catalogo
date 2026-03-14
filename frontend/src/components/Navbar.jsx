import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Package, MessageSquare, ClipboardList, User, Ticket } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Package color="#facc15" size={28} />
        <span style={{ marginLeft: '10px' }}>ALMACÉN <span style={{ color: '#facc15' }}>PRO</span></span>
      </div>

      <div style={styles.links}>
        <Link to="/catalogo" style={styles.link}><ClipboardList size={18} /> Catálogo</Link>
        <Link to="/reservas" style={styles.link}><Ticket size={18} /> Reservas</Link>
        <Link to="/chat" style={styles.link}><MessageSquare size={18} /> Chat</Link>
      </div>

      <div style={styles.userSection}>
        <div style={styles.userInfo}>
          <User size={16} color="#facc15" />
          <span>{user.nombre}</span>
          <span style={styles.roleBadge}>{user.rol}</span>
        </div>
        <button onClick={handleLogout} style={styles.btnLogout}>
          <LogOut size={18} /> Salir
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px', height: '70px', backgroundColor: '#000000', color: 'white', borderBottom: '4px solid #facc15', position: 'sticky', top: 0, zIndex: 1000 },
  logo: { display: 'flex', alignItems: 'center', fontSize: '22px', fontWeight: '900', letterSpacing: '1px' },
  links: { display: 'flex', gap: '30px' },
  link: { color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '15px', transition: '0.3s' },
  userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' },
  roleBadge: { backgroundColor: '#374151', color: '#facc15', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold' },
  btnLogout: { backgroundColor: '#facc15', color: '#000000', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }
};

export default Navbar;
