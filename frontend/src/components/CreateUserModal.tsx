import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import apiLocal from '../api/apiLocal';

// Props del componente
interface CreateUserModalProps {
  show: boolean;
  manejarCierre: () => void;
  alCrearUsuario: (nuevoUsuario: any) => void; 
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ show, manejarCierre, alCrearUsuario }) => {
  // Estados para los campos del formulario y los errores
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  const [error, setError] = useState<string | null>(null);

  const manejarCrearUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const nuevoUsuario = { nombre, email, password, rol };
      const respuesta = await apiLocal.post('/usuarios', nuevoUsuario);

      
      alCrearUsuario(respuesta.data); 
      manejarCierre(); 
    } catch (err: any) {
      const mensajeError = err.respuesta?.data?.message || 'Error al crear el usuario.';
      setError(Array.isArray(mensajeError) ? mensajeError.join(', ') : mensajeError);
    }
  };

  return (
    <Modal show={show} onHide={manejarCierre}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Form onSubmit={manejarCrearUsuario}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select value={rol} onChange={(e) => setRol(e.target.value as any)}>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={manejarCierre}>
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Guardar Usuario
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;