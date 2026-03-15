import { useState, useEffect, useContext } from 'react';
import { apiReservas, apiCatalogo } from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

export const useReservasLogic = () => {
  const [vales, setVales] = useState([]);
  const [productos, setProductos] = useState({}); 
  const { user } = useContext(AuthContext);

  const cargarDatos = async () => {
  try {
    // Petición 1: Catálogo
    console.log("Solicitando catálogo...");
    const resCat = await apiCatalogo.get('/');
    const mapaNombres = {};
    resCat.data.forEach(p => { mapaNombres[String(p.id)] = p.nombre_pieza; });
    setProductos(mapaNombres);
    console.log("✅ Catálogo cargado");

    // Petición 2: Reservas
    console.log("Solicitando reservas...");
    const resVales = await apiReservas.get('/'); 
    const valesNormalizados = resVales.data.map(v => ({
      ...v,
      id_pieza: String(v.id_pieza)
    }));
    setVales(valesNormalizados);
    console.log("✅ Reservas cargadas");

  } catch (err) {
    console.error("❌ Error detectado:", err.response?.data || err.message);
  }
};

  const eliminarVale = async (id) => {
    if (window.confirm("¿Confirmar eliminación?")) {
      try {
        await apiReservas.delete(`/${id}`);
        cargarDatos();
      } catch (err) { alert("Acceso restringido."); }
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  return { vales, productos, user, eliminarVale };
};