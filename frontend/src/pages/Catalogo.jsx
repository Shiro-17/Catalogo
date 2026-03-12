import { useEffect, useState, useContext } from 'react';
import { apiCatalogo } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Edit, Trash2, Package, X } from 'lucide-react';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const { user } = useContext(AuthContext); // Extraemos al usuario y su rol

  // Estados para el Modal de Agregar
  const [showModal, setShowModal] = useState(false);
  const [nuevaPieza, setNuevaPieza] = useState({
    nombre_pieza: '',
    descripcion: '',
    cantidad_stock: 0
  });

  // 1. Cargar productos al iniciar la pantalla
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await apiCatalogo.get('/');
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar catálogo:", err);
    }
  };

  // 2. Función para Guardar una nueva pieza (Solo Auxiliar)
  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await apiCatalogo.post('/', nuevaPieza);
      setShowModal(false); // Cerramos modal
      setNuevaPieza({ nombre_pieza: '', descripcion: '', cantidad_stock: 0 }); // Limpiamos formulario
      cargarProductos(); // Refrescamos la lista
      alert("¡Refacción guardada con éxito!");
    } catch (err) {
      alert("Error al guardar: " + (err.response?.data?.message || "Servidor no responde"));
    }
  };

  const solicitarPieza = async (idPieza) => {
  try {
        // Mandamos el ID de la pieza al puerto 3003
        await apiReservas.post('/', { id_pieza: idPieza, cantidad_solicitada: 1 });
        alert("¡Vale generado! Revisa la sección de Reservas.");
    } catch (err) {
        alert("Error al solicitar pieza.");
    }};

  return (
    <div style={styles.container}>
      {/* Encabezado dinámico */}
      <header style={styles.header}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package color="#2563eb" /> Catálogo de Inventario
          </h2>
          <p>Bienvenido, <strong>{user?.nombre}</strong> — Rol: <span style={styles.badge}>{user?.rol}</span></p>
        </div>
        
        {/* REGLA DE NEGOCIO: Solo el Auxiliar ve el botón de Agregar */}
        {user?.rol === 'auxiliar' && (
          <button onClick={() => setShowModal(true)} style={styles.btnAgregar}>
            <Plus size={18} /> Nueva Refacción
          </button>
        )}
      </header>

      {/* Cuadrícula de productos */}
      <div style={styles.grid}>
        {productos.length > 0 ? (
          productos.map(item => (
            <div key={item.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{item.nombre_pieza}</h3>
              <p style={styles.cardDesc}>{item.descripcion}</p>
              <div style={styles.stock}>
                Stock disponible: <strong>{item.cantidad_stock} unidades</strong>
              </div>
              
              <div style={styles.actions}>
                <button style={styles.btnReserva}>Solicitar Vale</button>

                {/* REGLA DE NEGOCIO: Solo el Auxiliar ve opciones de edición */}
                {user?.rol === 'auxiliar' && (
                  <>
                    <button style={styles.btnIcon} title="Editar"><Edit size={16} /></button>
                    <button style={styles.btnIconRed} title="Eliminar"><Trash2 size={16} /></button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>No hay piezas registradas en el catálogo.</p>
        )}
      </div>

      {/* --- MODAL PARA AGREGAR PIEZA --- */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3>Registrar Refacción</h3>
              <X onClick={() => setShowModal(false)} style={{ cursor: 'pointer' }} />
            </div>

            <form onSubmit={handleGuardar} style={styles.form}>
              <label>Nombre de la pieza:</label>
              <input 
                type="text"
                placeholder="Ej. Filtro de Aceite" 
                value={nuevaPieza.nombre_pieza}
                onChange={(e) => setNuevaPieza({...nuevaPieza, nombre_pieza: e.target.value})}
                style={styles.input} required 
              />
              
              <label>Descripción:</label>
              <textarea 
                placeholder="Detalles técnicos..." 
                value={nuevaPieza.descripcion}
                onChange={(e) => setNuevaPieza({...nuevaPieza, descripcion: e.target.value})}
                style={{ ...styles.input, height: '80px' }} 
              />
              
              <label>Cantidad en Almacén:</label>
              <input 
                type="number" 
                min="0"
                value={nuevaPieza.cantidad_stock}
                onChange={(e) => setNuevaPieza({...nuevaPieza, cantidad_stock: e.target.value})}
                style={styles.input} required 
              />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={styles.btnGuardar}>Guardar en Railway</button>
                <button type="button" onClick={() => setShowModal(false)} style={styles.btnCancelar}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Objeto de Estilos
const styles = {
  container: { padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px' },
  badge: { backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#fff', transition: 'box-shadow 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  cardTitle: { margin: '0 0 10px 0', fontSize: '18px', color: '#111827' },
  cardDesc: { color: '#6b7280', fontSize: '14px', marginBottom: '15px', minHeight: '40px' },
  stock: { padding: '8px', backgroundColor: '#f9fafb', borderRadius: '6px', fontSize: '14px', marginBottom: '15px' },
  actions: { display: 'flex', gap: '8px' },
  btnAgregar: { backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
  btnReserva: { flex: 1, backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' },
  btnIcon: { backgroundColor: '#f3f4f6', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  btnIconRed: { backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  // Estilos del Modal
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: 'white', padding: '25px', borderRadius: '15px', width: '450px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
  form: { display: 'flex', flexDirection: 'column', gap: '8px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', marginBottom: '10px', fontSize: '14px' },
  btnGuardar: { flex: 2, backgroundColor: '#059669', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  btnCancelar: { flex: 1, backgroundColor: '#9ca3af', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer' }
};

export default Catalogo;