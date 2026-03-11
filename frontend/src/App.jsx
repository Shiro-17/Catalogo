import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Catalogo from './pages/Catalogo';
import Chat from './pages/Chat';

// Importa las demás cuando las crees

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;