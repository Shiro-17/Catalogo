import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3004');

export const useChatLogic = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMsg, setNuevoMsg] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Cargar historial
    axios.get('http://localhost:3004/api/chat/historial')
      .then(res => setMensajes(res.data))
      .catch(err => console.error("Fallo historial:", err));

    // Escuchar mensajes
    socket.on('recibir_mensaje', (msg) => {
      setMensajes(prev => [...prev, msg]);
    });

    return () => socket.off('recibir_mensaje');
  }, []);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!nuevoMsg.trim()) return;
    socket.emit('enviar_mensaje', { usuario: user?.nombre || "Anon", mensaje: nuevoMsg });
    setNuevoMsg('');
  };

  return { mensajes, nuevoMsg, setNuevoMsg, enviarMensaje, user };
};