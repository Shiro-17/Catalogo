import { useEffect, useState, useContext } from 'react';
import { apiReservas } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Ticket, Trash2, CheckCircle, Clock, Hash } from 'lucide-react';

const Reservas = () => {
  const [vales, setVales] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => { cargarVales(); }, []);

  const cargarVales = async () => {
    try {
      const res = await apiReservas.get('/');
      setVales(res.data);
    } catch (err) { console.error("Error al cargar vales", err); }
  };

  const eliminarVale = async (id) => {
    if (window.confirm("¿Confirmar eliminación de registro de reserva?")) {
      try {
        await apiReservas.delete(`/${id}`);
        cargarVales();
      } catch (err) { alert("Acceso restringido: Solo nivel Auxiliar."); }
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={styles.iconBox}><Ticket size={30} color="#000" /></div>
          <div>
            <h2 style={{ margin: 0, letterSpacing: '1px' }}>CONTROL DE VALES</h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Registros con folios únicos NanoID</p>
          </div>
        </div>
      </header>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}><Hash size={14}/> FOLIO ÚNICO</th>
              <th style={styles.th}>ID SOLICITANTE</th>
              <th style={styles.th}>ESTADO</th>
              {user?.rol === 'auxiliar' && <th style={styles.th}>ACCIONES</th>}
            </tr>
          </thead>
          <tbody>
            {vales.map((vale) => (
              <tr key={vale.id} style={styles.row}>
                <td style={styles.folio}>{vale.id}</td>
                <td style={styles.td}>ID-{vale.id_usuario}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.status,
                    backgroundColor: vale.estado === 'pendiente' ? '#000' : '#facc15',
                    color: vale.estado === 'pendiente' ? '#facc15' : '#000'
                  }}>
                    {vale.estado === 'pendiente' ? <Clock size={12}/> : <CheckCircle size={12}/>}
                    {vale.estado.toUpperCase()}
                  </span>
                </td>
                {user?.rol === 'auxiliar' && (
                  <td style={styles.td}>
                    <button onClick={() => eliminarVale(vale.id)} style={styles.btnDelete}>
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
  container: { padding: '40px', maxWidth: '1100px', margin: '0 auto' },
  header: { marginBottom: '35px', borderBottom: '4px solid #000', paddingBottom: '15px' },
  iconBox: { backgroundColor: '#facc15', padding: '10px', borderRadius: '8px' },
  tableContainer: { backgroundColor: 'white', borderRadius: '4px', border: '2px solid #000', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  headerRow: { backgroundColor: '#000' },
  th: { padding: '15px', textAlign: 'left', color: '#facc15', fontSize: '12px', fontWeight: '900' },
  td: { padding: '15px', borderBottom: '1px solid #e5e7eb', color: '#111', fontSize: '14px' },
  folio: { padding: '15px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontWeight: 'bold', color: '#000', fontSize: '15px' },
  status: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: '900' },
  btnDelete: { backgroundColor: '#000', color: '#facc15', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }
};

export default Reservas;
