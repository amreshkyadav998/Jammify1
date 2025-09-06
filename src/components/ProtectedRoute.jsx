import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;