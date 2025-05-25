import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Usuario NO autenticado → redirige al login
    return <Navigate to="/login" replace />;
  }

  // Usuario autenticado → renderiza el contenido
  return children;
};

export default PrivateRoute;
