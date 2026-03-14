import { useEffect, useState, useContext } from 'react';
import { apiCatalogo, apiReservas } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Edit, Trash2, Package, X, Send } from 'lucide-react';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [nuevaPieza, setNuevaPieza] = useState({ nombre_pieza: '', descripcion: '', cantidad_stock: 0 });

  useEffect(() => { cargarProductos(); }, []);

  const cargarProductos = async () => {
    try {
      const res = await apiCatalogo.get('/');
      setProductos(res.data);
    } catch (err) { console.error("Error al cargar catálogo:", err); }
  };

  const solicitarPieza = async (idPieza) => {
    try {
      await apiReservas.post('/', { id_pieza: idPieza, cantidad_solicitada: 1 });
      alert("✅ Vale generado. Revisa la sección de Reservas.");
    } catch (err) { alert("❌ Error al solicitar pieza."); }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await apiCatalogo.post('/', nuevaPieza);
      setShowModal(false);
      setNuevaPieza({ nombre_pieza: '', descripcion: '', cantidad_stock: 0 });
      cargarProductos();
      alert("✨ Refacción registrada correctamente.");
    } catch (err) { alert("Error al guardar."); }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={30} /> INVENTARIO DE REFACCIONES
          </h2>
          <p style={{ color: '#6b7280', marginTop: '5px' }}>Gestión centralizada de stock y suministros</p>
        </div>
        {user?.rol === 'auxiliar' && (
          <button onClick={() => setShowModal(true)} style={styles.btnAgregar}>
            <Plus size={20} /> AGREGAR REFACCIÓN
          </button>
        )}
      </header>

      <div style={styles.grid}>
        {productos.map(item => (
          <div key={item.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{item.nombre_pieza}</h3>
            <p style={styles.cardDesc}>{item.descripcion}</p>
            <div style={styles.stock}>DISPONIBLE: <strong>{item.cantidad_stock} UNIDADES</strong></div>
            <div style={styles.actions}>
              <button onClick={() => solicitarPieza(item.id)} style={styles.btnReserva}>
                <Send size={16} /> SOLICITAR VALE
              </button>
              {user?.rol === 'auxiliar' && (
                <>
                  <button style={styles.btnIcon}><Edit size={16} /></button>
                  <button style={styles.btnIconRed}><Trash2 size={16} /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>NUEVO REGISTRO</h3>
              <X onClick={() => setShowModal(false)} style={{ cursor: 'pointer' }} />
            </div>
            <form onSubmit={handleGuardar} style={styles.form}>
              <input type="text" placeholder="Nombre de la refacción" onChange={(e) => setNuevaPieza({...nuevaPieza, nombre_pieza: e.target.value})} style={styles.input} required />
              <textarea placeholder="Descripción técnica" onChange={(e) => setNuevaPieza({...nuevaPieza, descripcion: e.target.value})} style={{...styles.input, height: '100px'}} />
              <input type="number" placeholder="Stock inicial" onChange={(e) => setNuevaPieza({...nuevaPieza, cantidad_stock: e.target.value})} style={styles.input} required />
              <button type="submit" style={styles.btnConfirmar}>CONFIRMAR EN SISTEMA</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '2px solid #e5e7eb', paddingBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
  card: { padding: '25px', borderRadius: '12px', backgroundColor: '#ffffff', border: '1px solid #d1d5db', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  cardTitle: { margin: '0 0 10px 0', fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' },
  cardDesc: { color: '#6b7280', fontSize: '14px', marginBottom: '20px', height: '45px', overflow: 'hidden' },
  stock: { padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', borderLeft: '5px solid #facc15' },
  actions: { display: 'flex', gap: '10px' },
  btnAgregar: { backgroundColor: '#000000', color: '#facc15', border: '2px solid #facc15', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' },
  btnReserva: { flex: 1, backgroundColor: '#facc15', color: '#000000', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  btnIcon: { backgroundColor: '#e5e7eb', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  btnIconRed: { backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 },
  modal: { backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '450px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' },
  btnConfirmar: { backgroundColor: '#000000', color: '#facc15', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }
};

export default Catalogo;
