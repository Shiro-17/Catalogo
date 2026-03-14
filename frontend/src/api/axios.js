import axios from 'axios';

export const apiUsuarios = axios.create({ baseURL: 'http://localhost:3001/api/usuarios' });
export const apiCatalogo = axios.create({ baseURL: 'http://localhost:3002/api/catalogo' });
export const apiReservas = axios.create({ baseURL: 'http://localhost:3003/api/reservas' });

const addToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

apiUsuarios.interceptors.request.use(addToken);
apiCatalogo.interceptors.request.use(addToken);
apiReservas.interceptors.request.use(addToken);
