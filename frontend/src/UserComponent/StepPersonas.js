// StepPersonas.js
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../formulario.css'

function StepPersonas() {
  const navigate = useNavigate();
  const [numPersonas, setNumPersonas] = useState(1);

  const handleNext = () => {
    localStorage.setItem('num_personas', numPersonas);
    navigate('/reservar/fecha');
  };

  return (
    <div className='InfoBox'>
      <h2>¿Cuántas personas?</h2>
      <input
        type="number"
        min="1"
        value={numPersonas}
        onChange={(e) => setNumPersonas(e.target.value)}
      />
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
}

export default StepPersonas;