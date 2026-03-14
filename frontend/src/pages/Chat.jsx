import { useState, useEffect, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { Send, MessageSquare } from 'lucide-react';

const socket = io('http://localhost:3004');

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState('');
  const [listaMensajes, setListaMensajes] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    socket.on('mensaje_recibido', (nuevo) => { setListaMensajes((prev) => [...prev, nuevo]); });
    return () => socket.off('mensaje_recibido');
  }, []);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [listaMensajes]);

  const enviar = (e) => {
    e.preventDefault();
    if (mensaje.trim()) {
      const data = { texto: mensaje, usuario: user.nombre, rol: user.rol, hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      socket.emit('mensaje_enviado', data);
      setMensaje('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <MessageSquare size={24} color="#facc15" />
          <h3 style={{ margin: 0 }}>CANAL OPERATIVO</h3>
        </div>

        <div style={styles.messagesContainer}>
          {listaMensajes.map((m, i) => (
            <div key={i} style={{ ...styles.wrapper, alignSelf: m.usuario === user.nombre ? 'flex-end' : 'flex-start' }}>
              <span style={styles.sender}>{m.usuario} • {m.rol}</span>
              <div style={{ ...styles.bubble, backgroundColor: m.usuario === user.nombre ? '#000000' : '#e5e7eb', color: m.usuario === user.nombre ? '#facc15' : '#000000' }}>
                {m.texto}
                <span style={{ ...styles.time, color: m.usuario === user.nombre ? '#ffffff88' : '#666' }}>{m.hora}</span>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={enviar} style={styles.inputArea}>
          <input type="text" placeholder="Escribe un reporte o consulta..." value={mensaje} onChange={(e) => setMensaje(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.btnSend}><Send size={20} /></button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '40px', height: 'calc(100vh - 150px)' },
  chatBox: { width: '100%', maxWidth: '800px', backgroundColor: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #e5e7eb' },
  header: { padding: '20px', backgroundColor: '#000000', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '15px' },
  messagesContainer: { flex: 1, padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#f9fafb' },
  wrapper: { display: 'flex', flexDirection: 'column', maxWidth: '70%' },
  sender: { fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', marginBottom: '5px', textTransform: 'uppercase' },
  bubble: { padding: '12px 18px', borderRadius: '18px', fontSize: '14px', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  time: { fontSize: '10px', display: 'block', marginTop: '5px', textAlign: 'right' },
  inputArea: { padding: '20px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '15px', backgroundColor: 'white' },
  input: { flex: 1, padding: '12px 20px', borderRadius: '30px', border: '2px solid #e5e7eb', outline: 'none', fontSize: '14px' },
  btnSend: { backgroundColor: '#000000', color: '#facc15', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default Chat;
