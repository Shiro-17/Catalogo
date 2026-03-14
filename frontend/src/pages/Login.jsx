import { useState, useContext } from 'react';
import { apiUsuarios } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Package, Lock, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Intentando conectar al puerto 3001...");
    
    try {
      const res = await apiUsuarios.post('/login', { email, password });
      console.log("Servidor respondió:", res.data);

      if (res.data.token) {
        // Guardamos usuario y token
        const userObj = res.data.usuario || res.data.user;
        login(userObj, res.data.token);
      } else {
        alert("El servidor no envió el token de acceso.");
      }
    } catch (err) {
      console.error("Detalle del error:", err);
      if (!err.response) {
        alert("ERROR DE CONEXIÓN: ¿Está encendida la terminal del puerto 3001?");
      } else {
        alert("ACCESO DENEGADO: Revisa que el correo y contraseña existan en la BD.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.logoSection}>
          <Package size={60} color="#facc15" />
          <h1 style={styles.title}>ALMACÉN<span style={{ color: '#facc15' }}>PRO</span></h1>
          <p style={styles.subtitle}>SISTEMA DE GESTIÓN DE REFACCIONES</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <User size={20} style={styles.icon} />
            <input type="email" placeholder="CORREO ELECTRÓNICO" onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <Lock size={20} style={styles.icon} />
            <input type="password" placeholder="CONTRASEÑA" onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          </div>
          <button type="submit" style={styles.btnLogin}>ACCEDER AL PANEL</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' },
  loginCard: { width: '400px', padding: '50px', backgroundColor: '#000', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', textAlign: 'center' },
  logoSection: { marginBottom: '40px' },
  title: { color: '#fff', margin: '10px 0 0 0', fontSize: '32px', fontWeight: '900' },
  subtitle: { color: '#6b7280', fontSize: '10px', letterSpacing: '2px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '15px', color: '#facc15' },
  input: { width: '100%', padding: '15px 15px 15px 50px', backgroundColor: '#1f2937', border: '2px solid #374151', borderRadius: '10px', color: '#fff', fontSize: '13px', outline: 'none' },
  btnLogin: { backgroundColor: '#facc15', color: '#000', border: 'none', padding: '18px', borderRadius: '10px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }
};

export default Login;