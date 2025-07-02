import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import pokebolaLogo from '../assets/images/pokeball.png';

function NavbarComponent() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const manejarCierreDeSesion = () => {

    localStorage.removeItem('jwt_token');
    
    navigate('/login');
  };

  // No se muestra el Navbar en la página de login
  if (!isAuthenticated) {
    return null; 
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand as={Link} to="/pokedex" className="d-flex align-items-center">
          {/* 3. Añadimos el componente Image de React-Bootstrap */}
          <Image
            src={pokebolaLogo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Pokebola logo"
            roundedCircle 
          />
          PokeChallenge
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/pokedex">Pokédex</Nav.Link>

            {user?.rol === 'admin' && (
              <Nav.Link as={Link} to="/admin/usuarios">Admin Usuarios</Nav.Link>
            )}
          </Nav>
          <Nav>

            <Navbar.Text className="me-3">
              {user?.email}
            </Navbar.Text>
            <Button variant="outline-light" onClick={manejarCierreDeSesion}>
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;