import { useEffect, useState } from 'react';
import axios from 'axios';
import BotonBack from '../generalComponent/BotonBack';
import Calendar from "react-multi-date-picker";



const ConfigAdmin = () => {
  const [form, setForm] = useState({
    user: localStorage.getItem('user'),
    hora_inicio_1: '12:30',
    hora_fin_1: '16:00',
    hora_inicio_2: '19:30',
    hora_fin_2: '23:00',
    Intervalo: 30,
    MinPersona: 2,
    MaxPersona: 10,
    MaxPersonaPerperiod:20,
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/configuracion/')
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form)
  };


  const handleSubmit = e => {
    console.log(localStorage.getItem('token'))
    e.preventDefault();
    axios.put('http://localhost:8000/api/configuracion/', form, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    }) 
    .then(() => alert('Configuración actualizada'))
    .catch(err => alert('Error al guardar'));
  };

  const handleSubmitCalendar = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/configuracion/fechas_cerradas/', {
      fechas_cerradas: form.fechas_cerradas,
    }, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
      .then(() => alert('Fechas cerradas actualizadas'))
      .catch(err => alert('Error al guardar fechas'));
  };


  return (
    <div>
      <BotonBack/>
      <form onSubmit={handleSubmitCalendar}>
        <div style={{ margin: "1rem 0" }}>
          <label><strong>Días que el restaurante estará cerrado:</strong></label>
          <Calendar
            multiple
            format="YYYY-MM-DD"
            value={form.fechas_cerradas || []}
            onChange={(dates) => {
              const fechas = dates.map((fecha) => fecha.format("YYYY-MM-DD"));
              setForm({ ...form, fechas_cerradas: fechas });
            }}
          />
        </div>
        <button type="submit">Guardar configuración</button>
      </form>


      <form onSubmit={handleSubmit}>
        <h2>Configuración de Reservas</h2>


        <div >
          <label>Turno 1:</label>
          <div className='flex' >
          <input type="time" name="hora_inicio_1" step="1800" value={form.hora_inicio_1} onChange={handleChange} required />

          
          <input type="time" name="hora_fin_1" step="1800" value={form.hora_fin_1} onChange={handleChange} required />
          </div>
        </div>
        <div >
          <label>Turno 2:</label>
          <div className='flex' >
          <input type="time" name="hora_inicio_2" step="1800" value={form.hora_inicio_2} onChange={handleChange} required />

          
          <input type="time" name="hora_fin_2" step="1800" value={form.hora_fin_2} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <label htmlFor="opciones">Intervalor de tiempo:  </label>
          <select name="Intervalo" value={form.Intervalo} onChange={handleChange}>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="60">1 h</option>
            <option value="90">1 h 30 min</option>
            <option value="120">2 h</option>
          </select>
        </div>

        <div>
          <label htmlFor="opciones">Mínimo de persona: </label>
          <select name="MinPersona" value={form.MinPersona} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div>
          <label htmlFor="opciones">Máximo de persona:  </label>
          <select name="MaxPersona" value={form.MaxPersona} onChange={handleChange}>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div>
          <label htmlFor="opciones">Máximo personas por periodo:  </label>
            <input name="MaxPersonaPerperiod" value={form.MaxPersonaPerperiod} onChange={handleChange} required />
        </div>
        <button type="submit">Guardar configuración</button>
      </form>
    </div>
  );
};

export default ConfigAdmin;
