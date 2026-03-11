import { useState } from 'react'; // Para manejar el estado del formulario
import { apiUsuarios } from '../api/axios'; // Esta es la instancia de Axios configurada para el microservicio de Usuarios
import { useNavigate } from 'react-router-dom'; // Para redirigir después del login
import { LogIn, Wrench } from 'lucide-react'; // Iconos bonitos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Llamada al microservicio de Usuarios (Puerto 3001)
      const response = await apiUsuarios.post('/login', { email, password });
      
      // 2. Guardar Token y Datos en LocalStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // 3. ¡Vámonos al catálogo!
      navigate('/catalogo');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al conectar con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Wrench size={48} color="#2563eb" />
          <h2>Gestión de Refacciones</h2>
          <p>Inicia sesión para acceder al inventario</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          
          <button type="submit" style={styles.button}>
            <LogIn size={20} /> Entrar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

// Estilos rápidos para que no se vea feo
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' },
  card: { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' },
  button: { padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#2563eb', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: 'bold' },
  error: { color: '#dc2626', fontSize: '14px', textAlign: 'center' }
};

export default Login;