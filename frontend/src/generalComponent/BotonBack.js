import { useNavigate } from 'react-router-dom';

const BotonBack = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
      ← Volver
    </button>
  );
};

export default BotonBack;
