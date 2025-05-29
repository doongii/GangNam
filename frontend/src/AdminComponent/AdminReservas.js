import { useEffect, useState } from 'react';
import axios from 'axios';
import BotonBack from '../generalComponent/BotonBack';


const MisReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // asegúrate de que el token esté guardado al logear
    axios.get('http://localhost:8000/api/reservas/mis-reservas/', {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => setReservas(res.data))
    .catch(err => console.error('Error al cargar reservas:', err));
  }, []);

  return (
    <div>
      <BotonBack/>
      <div className="InfoBox">
        <h2>Mis reservas</h2>
        {reservas.length === 0 ? (
          <p>No hay reservas.</p>
        ) : (
          <ul>
            {reservas.map((reserva, index) => (
              <li key={index}>
                <strong>{reserva.fecha} {reserva.hora}</strong> — {reserva.nombre} {reserva.apellido} ({reserva.num_personas} personas)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MisReservas;
