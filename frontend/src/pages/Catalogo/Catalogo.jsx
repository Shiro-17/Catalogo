import { useCatalogoLogic } from './CatalogoLogic';
import { styles } from './Catalogo.styles';
import { Package, Send, Edit, Trash2, Plus } from 'lucide-react';
const Catalogo = () => {
  // Extraemos lo necesario de nuestro Hook de lógica
  const { productos, solicitarPieza, user, setShowModal } = useCatalogoLogic();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={30} /> INVENTARIO
          </h2>
        </div>
        {/* Solo el auxiliar ve el botón de agregar */}
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
            <div style={styles.stock}>STOCK: {item.cantidad_stock}</div>
            
            <div style={styles.actions}>
              {/* 🔑 LA CLAVE: Si NO es auxiliar, muestra botón de reserva. Si ES, muestra editar/borrar */}
              {user?.rol !== 'auxiliar' ? (
                <button onClick={() => solicitarPieza(item.id)} style={styles.btnReserva}>
                  <Send size={16} /> SOLICITAR VALE
                </button>
              ) : (
                <>
                  <button style={styles.btnIcon}><Edit size={16} /></button>
                  <button style={styles.btnIconRed}><Trash2 size={16} /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;