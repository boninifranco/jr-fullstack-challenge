import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import PokedexPage from './pages/PokedexPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/pokedex' element={<PokedexPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
