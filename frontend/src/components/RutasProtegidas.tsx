import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//Si el usuario no está autenticado (no hay token),
const RutasProtegidas = () => {
    
  const token = localStorage.getItem('jwt_token');

  if (!token) {
    
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};
export default RutasProtegidas