import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRutaProtegida = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.rol !== 'admin' && user?.rol !== 'editor') {
    return <Navigate to="/pokedex" replace />;
  }

  return <Outlet />;
};

export default AdminRutaProtegida;