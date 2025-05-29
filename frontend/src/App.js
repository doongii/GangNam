import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import StepContacto from './UserComponent/StepContacto';
import StepConfirmacion from './UserComponent/StepConfirmacion';
import PasoReserva from './UserComponent/StepPersonasFecha';
import ConfigAdmin from './AdminComponent/configuration';
import AdminPanel from './AdminComponent/AdminPanel';
import AdminReservas from './AdminComponent/AdminReservas';
import Login from  './AdminComponent/LoginRestaurante';
import PrivateRoute from './AdminComponent/PrivateRoute';
import ListaRestaurantes from './UserComponent/Restaurantes';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/restaurantes" element={<ListaRestaurantes/>} />
        <Route path="/reservar" element={<PasoReserva/>} />
        <Route path="/reservar/contacto" element={<StepContacto />} />
        <Route path="/reservar/confirmacion" element={<StepConfirmacion />} />
        <Route path="/admin/panel" element={<PrivateRoute>  <AdminPanel /> </PrivateRoute>} />
        <Route path="/admin/configuracion" element={<PrivateRoute> <ConfigAdmin /> </PrivateRoute>} />
        <Route path="/admin/reservas" element={<PrivateRoute> <AdminReservas /> </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
