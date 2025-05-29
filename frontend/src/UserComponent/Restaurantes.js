import { useEffect, useState } from 'react';
import axios from 'axios';
import '../formulario.css';
import BotonBack from '../generalComponent/BotonBack';
import { useNavigate } from 'react-router-dom';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/restaurantes/lista/')
      .then(res => setRestaurantes(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleClick = (rest) => {
    // Guardar en localStorage
    localStorage.setItem("restaurante_id", rest.id);
    localStorage.setItem("restaurante_nombre", rest.nombre_restaurante);
    
    // Navegar
    navigate('/reservar');
  };

  return (
    
    <div>
      <BotonBack/>
      <h2>Restaurantes disponibles:</h2>
      {restaurantes.map(rest => (
        <button
          key={rest.id}
          onClick={() => handleClick(rest)}
          style={{
            display: 'block',
            margin: '8px 0',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          {rest.nombre_restaurante}
        </button>
      ))}
    </div>
  );
};

export default ListaRestaurantes;
