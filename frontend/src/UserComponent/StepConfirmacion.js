import { useNavigate } from 'react-router-dom';
import '../formulario.css'


const StepConfirmacion = () => {
  const navigate = useNavigate();

  const datos = {
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
      const response = await fetch('http://localhost:8000/api/reservas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      if (!response.ok) throw new Error('Error al reservar');
      alert('Reserva confirmada!');
      localStorage.clear();
      navigate('/');
    } catch (error) {
      alert('Hubo un error');
      console.error(error);
    }
  };

  return (
    <div className='InfoBox'>
      <h2>Confirma tu reserva</h2>
      <ul>
        {Object.entries(datos).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Confirmar</button>
    </div>
  );
};

export default StepConfirmacion;
