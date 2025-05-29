import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../formulario.css'
import BotonBack from '../generalComponent/BotonBack';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/restaurantes/login/', form);
      const token = res.data.token;

      // Guardar el token en localStorage o sessionStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', res.data.user_id);
      localStorage.setItem('username',res.data.username );

      // Redirigir al panel admin o configuración
      navigate('/admin/panel');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <BotonBack/>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Iniciar sesión - Restaurante</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Entrar</button>
      </form>
      </div>
  );
};

export default Login;
