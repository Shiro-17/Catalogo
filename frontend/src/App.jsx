import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Catalogo from './pages/Catalogo';
import Reservas from './pages/Reservas';
import Chat from './pages/Chat';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/catalogo" />} />
        <Route path="/catalogo" element={user ? <Catalogo /> : <Navigate to="/" />} />
        <Route path="/reservas" element={user ? <Reservas /> : <Navigate to="/" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
