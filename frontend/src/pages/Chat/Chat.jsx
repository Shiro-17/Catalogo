import { useChatLogic } from './ChatLogic';

const Chat = () => {
  const { mensajes, nuevoMsg, setNuevoMsg, enviarMensaje, user } = useChatLogic();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ color: '#000', borderLeft: '5px solid #facc15', paddingLeft: '10px' }}>
        CHAT DE ALMACÉN PRO
      </h2>
      <div style={{ height: '400px', overflowY: 'auto', border: '2px solid #000', padding: '15px', background: '#fff' }}>
        {mensajes.map((m, i) => (
          <div key={i} style={{ 
            textAlign: m.usuario === user.nombre ? 'right' : 'left',
            margin: '10px 0' 
          }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '8px 12px', 
              background: m.usuario === user.nombre ? '#facc15' : '#eee',
              border: '1px solid #000',
              borderRadius: '5px'
            }}>
              <small style={{ display: 'block', fontWeight: 'bold' }}>{m.usuario}</small>
              {m.mensaje}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={enviarMensaje} style={{ display: 'flex', marginTop: '10px' }}>
        <input 
          style={{ flex: 1, padding: '10px', border: '2px solid #000' }}
          value={nuevoMsg} onChange={e => setNuevoMsg(e.target.value)}
          placeholder="Escribir..."
        />
        <button type="submit" style={{ background: '#000', color: '#facc15', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          ENVIAR
        </button>
      </form>
    </div>
  );
};

export default Chat;