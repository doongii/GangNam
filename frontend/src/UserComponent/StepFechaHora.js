import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../formulario.css'

const StepFechaHora = () => {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleNext = () => {
    localStorage.setItem('fecha', fecha);
    localStorage.setItem('hora', hora);
    navigate('/reservar/contacto');
  };

  return (
    <div className='InfoBox'>
      <h2>Selecciona fecha y hora</h2>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
};

export default StepFechaHora;
