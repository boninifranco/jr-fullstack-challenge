import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiLocal from "../api/apiLocal";


function LoginPage() {
  //constantes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  //función para enviar el formulario
  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const respuesta = await apiLocal.post("/auth/login", { email, password });

      localStorage.setItem('jwt_token', respuesta.data.access_token);

      navigate("/pokedex");
      
    } catch (err: any) {
      const mensajeError = err.response?.data?.message || "Error desconocido. Intente de nuevo.";
      setError(mensajeError);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6} lg={4}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={manejarEnvio}> 
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Ingresar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage;
