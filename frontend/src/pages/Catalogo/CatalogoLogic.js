// src/components/catalogo/CatalogoLogic.js
import { useState, useEffect, useContext } from 'react';
import { apiCatalogo, apiReservas } from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

export const useCatalogoLogic = () => {
  const [productos, setProductos] = useState([]);
  const { user } = useContext(AuthContext);

  const cargarProductos = async () => {
    try {
      const res = await apiCatalogo.get('/');
      setProductos(res.data);
    } catch (err) {
      console.error("❌ Error al cargar productos:", err);
    }
  };

  useEffect(() => { cargarProductos(); }, []);

  const solicitarPieza = async (producto) => {
    // Buscamos el ID en cualquier variante que pueda venir de la DB
    const idEncontrado = producto.id || producto.id_pieza;

    if (!idEncontrado) {
      console.error("📦 Objeto producto recibido:", producto);
      return alert("Error: No se pudo identificar la refacción en el sistema.");
    }

    try {
      const datosReserva = {
        id_pieza: idEncontrado,
        id_usuario: user?.id || 2 // ID de prueba si no hay sesión
      };

      const response = await apiReservas.post('/', datosReserva);
      alert("✅ ¡ÉXITO! Folio generado: " + response.data.id);
      
    } catch (err) {
      console.error("❌ Error en reserva:", err.response?.data);
      alert("Error al procesar la reserva.");
    }
  };

  return { productos, solicitarPieza, user };
};