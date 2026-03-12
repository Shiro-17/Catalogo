import { useEffect, useState, useContext } from 'react';
import { apiReservas } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Ticket, Trash2, CheckCircle, Clock } from 'lucide-react';

const Reservas = () => {
  const [vales, setVales] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    cargarVales();
  }, []);

  const cargarVales = async () => {
    try {
      const res = await apiReservas.get('/');
      setVales(res.data);
    } catch (err) {
      console.error("Error al cargar vales", err);
    }
  };

  const cancelarVale = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este vale?")) {
      try {
        await apiReservas.delete(`/${id}`);
        cargarVales();
      } catch (err) {
        alert("No tienes permiso para eliminar vales.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2><Ticket color="#f59e0b" /> Historial de Vales (Reservas)</h2>
        <p>Aquí se gestionan las salidas de almacén con folios <strong>NanoID</strong>.</p>
      </header>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Folio Único (NanoID)</th>
              <th>Usuario</th>
              <th>Estado</th>
              {user?.rol === 'auxiliar' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {vales.map((vale) => (
              <tr key={vale.id}>
                <td style={styles.folio}>{vale.id}</td>
                <td>Usuario #{vale.id_usuario}</td>
                <td>
                  <span style={{
                    ...styles.status,
                    backgroundColor: vale.estado === 'pendiente' ? '#fef3c7' : '#dcfce7',
                    color: vale.estado === 'pendiente' ? '#92400e' : '#166534'
                  }}>
                    {vale.estado === 'pendiente' ? <Clock size={14}/> : <CheckCircle size={14}/>}
                    {vale.estado}
                  </span>
                </td>
                {user?.rol === 'auxiliar' && (
                  <td>
                    <button 
                      onClick={() => cancelarVale(vale.id)} 
                      style={styles.btnDelete}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px', maxWidth: '1000px', margin: '0 auto' },
  header: { marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' },
  tableContainer: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  folio: { fontFamily: 'monospace', fontWeight: 'bold', color: '#2563eb', fontSize: '1.1em' },
  status: { display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize' },
  btnDelete: { backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' }
};

// Asegúrate de añadir padding y bordes a los th y td en tu CSS global o aquí mismo
export default Reservas;