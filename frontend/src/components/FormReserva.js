import { useState } from "react";
import axios from "axios";
import './FormReserva.css';


const FormReserva = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    num_personas: 1,
    comentarios: ''
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/reservas/", formData);
      alert("Reserva enviada con éxito");
    } catch (error) {
      alert("Error al enviar la reserva");
      console.error(error);
    }
  };

  return (
    <div>
      <p>Hola </p>
      <form onSubmit={handleSubmit}>
        <input name="nombre" onChange={handleChange} placeholder="Nombre" required />
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
        <input name="telefono" onChange={handleChange} placeholder="Teléfono" required />
        <input name="fecha" type="date" onChange={handleChange} required />
        <input name="hora" type="time" onChange={handleChange} required />
        <input name="num_personas" type="number" onChange={handleChange} min="1" required />
        <textarea name="comentarios" onChange={handleChange} placeholder="Comentarios" />
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default FormReserva;
