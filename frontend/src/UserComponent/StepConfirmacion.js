import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../formulario.css';
import BotonBack from '../generalComponent/BotonBack';

const StepConfirmacion = () => {
  const navigate = useNavigate();

  const datos = {
    restaurante: localStorage.getItem('restaurante_id'), // Necesario para el backend
    num_personas: localStorage.getItem('num_personas'),
    fecha: localStorage.getItem('fecha'),
    hora: localStorage.getItem('hora'),
    nombre: localStorage.getItem('nombre'),
    apellido: localStorage.getItem('apellido'),
    email: localStorage.getItem('email'),
    telefono: localStorage.getItem('telefono'),
    comentarios: localStorage.getItem('comentarios'),
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/api/reservas/confirmar/', datos);
      alert('¡Reserva confirmada!');
      localStorage.clear();
      navigate('/');
    } catch (error) {
      alert('Hubo un error al confirmar la reserva.');
      console.error(error);
    }
  };

  const labels = {
    num_personas: 'Número de personas',
    fecha: 'Fecha',
    hora: 'Hora',
    nombre: 'Nombre',
    apellido: 'Apellido',
    email: 'Email',
    telefono: 'Teléfono',
    comentarios: 'Comentarios',
  };

  return (
    <div>
      <BotonBack/>
    <div className='InfoBox'>
      <h2>Confirma tu reserva</h2>
      <ul style={{ textAlign: 'left' }}>
        {Object.entries(datos)
          .filter(([key]) => key !== 'restaurante') // Oculta el ID del restaurante
          .map(([key, value]) => (
            <li key={key}>
              <strong>{labels[key] || key}:</strong> {value || <em>No proporcionado</em>}
            </li>
        ))}
      </ul>
      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Confirmar
      </button>
    </div>
    </div>
  );
};

export default StepConfirmacion;
