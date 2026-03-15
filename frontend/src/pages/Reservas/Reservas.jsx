import { useReservasLogic } from './ReservasLogic';
import { styles } from './Reservas.styles';
import { Ticket, Trash2, CheckCircle, Clock, Hash, Package } from 'lucide-react';

const Reservas = () => {
  const { vales, productos, user, eliminarVale } = useReservasLogic();
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
              <th style={styles.th}><Hash size={14}/> FOLIO</th>
              <th style={styles.th}><Package size={14}/> REFACCIÓN</th>
              <th style={styles.th}>ESTADO</th>
              {user?.rol === 'auxiliar' && <th style={styles.th}>ACCIONES</th>}
            </tr>
          </thead>
          <tbody>
            {vales.map((vale) => (
              <tr key={vale.id}>
                <td style={styles.folio}>{vale.id}</td>
                <td style={styles.td}>
                  {/* Aquí es donde ocurre la magia de los nombres */}
                  {productos[vale.id_pieza] || `ID: ${vale.id_pieza}`}
                </td>
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

export default Reservas;