import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// eslint-disable-next-line
import DatePicker from 'react-datepicker';
// eslint-disable-next-line
import 'react-datepicker/dist/react-datepicker.css';
import '../formulario.css';
import BotonBack from '../generalComponent/BotonBack';

const PasoReserva = () => {
  const navigate = useNavigate();

  const [config, setConfig] = useState(null);
  const [numPersonas, setNumPersonas] = useState(2);
  const [hora, setHora] = useState('');
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);

  const today = new Date();

  // Generador de bloques horario
  const generarBloquesHorario = useCallback((config) => {
    const interval = config.intervalo;
    const bloques = [];

    const agregarTurno = (inicio, fin) => {
      let current = new Date(`2020-01-01T${inicio}`);
      const end = new Date(`2020-01-01T${fin}`);
      while (current < end) {
        bloques.push(current.toTimeString().slice(0, 5));
        current = new Date(current.getTime() + interval * 60000);
      }
    };

    agregarTurno(config.hora_inicio_1, config.hora_fin_1);
    agregarTurno(config.hora_inicio_2, config.hora_fin_2);

    const now = new Date();
    const nowInMadrid = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
    const currentTime = nowInMadrid.toTimeString().slice(0, 5);

    const selectedDateStr = fecha.toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = selectedDateStr === todayStr;

    const disponibles = isToday
      ? bloques.filter(h => h >= currentTime)
      : bloques;

    setHorasDisponibles(disponibles);
  }, [fecha]);

  // Cargar config + fechas no disponibles
  useEffect(() => {
    const restauranteId = localStorage.getItem('restaurante_id');

    axios.get(`http://localhost:8000/api/reservas/configuracion/publica/?restaurante_id=${restauranteId}`)
      .then(res => {
        const data = res.data;
        setConfig(data);
        setNumPersonas(data.min_personas <= 2 ? 2 : data.min_personas);
        localStorage.setItem('config_reserva', JSON.stringify(data));
        generarBloquesHorario(data);
      })
      .catch(err => console.error('Error al obtener configuración:', err));

    axios.get(`http://localhost:8000/api/reservas/fechas-no-disponibles/?restaurante_id=${restauranteId}`)
      .then(res => {
        const fechasBloqueadas = res.data.map(f => new Date(f));
        setFechasNoDisponibles(fechasBloqueadas);
      })
      .catch(err => console.error('Error al obtener fechas no disponibles:', err));
  }, [generarBloquesHorario]);

  useEffect(() => {
    if (config) {
      generarBloquesHorario(config);
    }
  }, [fecha, config, generarBloquesHorario]);

  const handleNext = () => {
    localStorage.setItem('num_personas', numPersonas);
    localStorage.setItem('fecha', fecha.toISOString().split('T')[0]);
    localStorage.setItem('hora', hora);
    navigate('/reservar/contacto');
  };

  if (!config) return <div>Cargando configuración...</div>;

  return (
    <div>
      <BotonBack/>
    <div className='InfoBox'>
      
      <h2>¿Cuántas personas?</h2>
      <select value={numPersonas} onChange={(e) => setNumPersonas(Number(e.target.value))}>
        {Array.from({ length: config.max_personas - config.min_personas + 1 }, (_, i) => {
          const val = config.min_personas + i;
          return <option key={val} value={val}>{val}</option>;
        })}
      </select>

      <h2 style={{ marginTop: '2rem' }}>Selecciona fecha y hora</h2>

      <DatePicker
        selected={fecha}
        onChange={(date) => setFecha(date)}
        minDate={today}
        excludeDates={fechasNoDisponibles}
        dateFormat="yyyy-MM-dd"
      />

      <div style={{ marginTop: '1rem' }}>
        <h3>Horas disponibles</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {horasDisponibles.map((h) => (
            <button
              key={h}
              onClick={() => setHora(h)}
              style={{
                padding: '8px 12px',
                backgroundColor: h === hora ? '#4caf50' : '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {hora && (
        <button
          onClick={handleNext}
          style={{ marginTop: '2rem' }}
        >
          Siguiente
        </button>
      )}
      </div>
    </div>
  );
};

export default PasoReserva;
