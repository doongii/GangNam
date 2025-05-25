import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import StepFechaHora from './UserComponent/StepFechaHora';
import StepContacto from './UserComponent/StepContacto';
import StepConfirmacion from './UserComponent/StepConfirmacion';
import StepPersonas from './UserComponent/StepPersonas';
import ConfigAdmin from './AdminComponent/configuration';
import AdminPanel from './AdminComponent/AdminPanel';
import AdminReservas from './AdminComponent/AdminReservas';
import Login from  './AdminComponent/LoginRestaurante';
import PrivateRoute from './AdminComponent/PrivateRoute';


console.log(StepPersonas); // debe mostrar una función
console.log('StepPersonas:', StepPersonas);


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/reservar" element={<StepPersonas/>} />
        <Route path="/reservar/fecha" element={<StepFechaHora />} />
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
