import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import PokedexPage from './pages/PokedexPage';
import './App.css';
import AdminRutaProtegida from './components/AdminRutaProtegida';
import AdminUsersPage from './pages/AdminUsersPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        {/*Ruta sin logear*/}
        <Route path='/login' element={<LoginPage/>}/>

        {/*Ruta user por defecto*/}
        <Route path='/pokedex' element={<PokedexPage/>}/>

        {/*Ruta admin/editor*/}
         <Route element={<AdminRutaProtegida />}>
          <Route path="/admin/usuarios" element={<AdminUsersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
