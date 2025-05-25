
import { useNavigate } from 'react-router-dom';
import './formulario.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido al sistema de reservas</h1>
      <button onClick={() => navigate('/reservar')}>Reservar ahora</button><br/> <br/>
      <button onClick={() => navigate('/login')}>Admin</button>
    </div>
  );
};

export default Home;
