import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../formulario.css'
import BotonBack from '../generalComponent/BotonBack';

const StepContacto = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    comentarios: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    Object.keys(form).forEach(key => {
      localStorage.setItem(key, form[key]);
    });
    navigate('/reservar/confirmacion');
  };

  return (
    <div>
      <BotonBack/>
    <div className='InfoBox'>
      <h2>Información de contacto</h2>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
      <textarea name="comentarios" placeholder="Comentarios" onChange={handleChange} />
      <button onClick={handleNext}>Siguiente</button>
    </div>
    </div>
  );
};

export default StepContacto;
