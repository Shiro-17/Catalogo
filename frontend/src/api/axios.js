import axios from 'axios';

const apiUsuarios = axios.create({ baseURL: 'http://localhost:3001/api/usuarios' });
const apiCatalogo = axios.create({ baseURL: 'http://localhost:3002/api/catalogo' });
const apiReservas = axios.create({ baseURL: 'http://localhost:3003/api/reservas' });

// Este interceptor pegará automáticamente el token en cada petición
const addToken = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

apiCatalogo.interceptors.request.use(addToken);
apiReservas.interceptors.request.use(addToken);

export { apiUsuarios, apiCatalogo, apiReservas };