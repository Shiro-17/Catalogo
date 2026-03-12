import { useState, useEffect, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { Send, User, MessageCircle } from 'lucide-react';

// Conectamos con el microservicio de Chat (Puerto 3004)
const socket = io('http://localhost:3004');

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState('');
  const [listaMensajes, setListaMensajes] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    // Escuchar mensajes que llegan del servidor
    socket.on('mensaje_recibido', (nuevoMensaje) => {
      setListaMensajes((prev) => [...prev, nuevoMensaje]);
    });

    return () => socket.off('mensaje_recibido');
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [listaMensajes]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (mensaje.trim() !== '') {
      const data = {
        texto: mensaje,
        usuario: user.nombre,
        rol: user.rol,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // "Gritar" el mensaje al servidor
      socket.emit('mensaje_enviado', data);
      setMensaje('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <MessageCircle size={24} />
          <h3>Canal de Comunicación Almacén</h3>
        </div>

        <div style={styles.messagesContainer}>
          {listaMensajes.map((m, index) => (
            <div 
              key={index} 
              style={{
                ...styles.messageWrapper,
                alignSelf: m.usuario === user.nombre ? 'flex-end' : 'flex-start'
              }}
            >
              <span style={styles.username}>{m.usuario} ({m.rol})</span>
              <div style={{
                ...styles.bubble,
                backgroundColor: m.usuario === user.nombre ? '#2563eb' : '#e5e7eb',
                color: m.usuario === user.nombre ? 'white' : 'black'
              }}>
                {m.texto}
                <span style={styles.time}>{m.hora}</span>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={enviarMensaje} style={styles.inputArea}>
          <input 
            type="text" 
            placeholder="Escribe un mensaje..." 
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.btnSend}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '20px', height: '80vh' },
  chatBox: { width: '100%', maxWidth: '600px', backgroundColor: 'white', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' },
  header: { padding: '15px', backgroundColor: '#1e293b', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' },
  messagesContainer: { flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#f8fafc' },
  messageWrapper: { display: 'flex', flexDirection: 'column', maxWidth: '70%' },
  username: { fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: 'bold' },
  bubble: { padding: '10px 15px', borderRadius: '15px', fontSize: '14px', position: 'relative' },
  time: { fontSize: '10px', display: 'block', marginTop: '5px', opacity: 0.7, textAlign: 'right' },
  inputArea: { padding: '15px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none' },
  btnSend: { backgroundColor: '#2563eb', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default Chat;