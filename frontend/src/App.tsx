import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PokedexPage from "./pages/PokedexPage";
import "./App.css";
import AdminRutaProtegida from "./components/AdminRutaProtegida";
import AdminUsersPage from "./pages/AdminUsersPage";
import NavbarComponent from "./components/NavbarComponent";
import RutasProtegidas from "./components/RutasProtegidas";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        {/*Ruta sin logear*/}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RutasProtegidas />}>
          {/*Ruta user por defecto*/}
          <Route path="/pokedex" element={<PokedexPage />} />

          {/*Ruta admin/editor*/}
          <Route element={<AdminRutaProtegida />}>
            <Route path="/admin/usuarios" element={<AdminUsersPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
