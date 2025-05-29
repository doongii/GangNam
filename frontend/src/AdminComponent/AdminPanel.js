import { useNavigate } from 'react-router-dom';
import '../formulario.css'
import BotonBack from '../generalComponent/BotonBack';

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  return (
    <div>
      <BotonBack/>
      <h1>Bienvenido al sistema de reservas</h1>
      <p>{user}</p>
      <button onClick={() => navigate('/admin/reservas')}>Reservas</button> <br/><br/>
      <button onClick={() => navigate('/admin/configuracion')}>Configurar</button>
    </div>
  );
};

export default AdminPanel;
