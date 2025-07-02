import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import apiLocal from '../api/apiLocal';

// Interfaz para el objeto User (podrías moverla a un archivo de tipos compartido)
interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'editor' | 'viewer';
}

// Props que el modal de edición necesita
interface EditUserModalProps {
  show: boolean;
  manejarCierre: () => void;
  usuario: User | null; // El usuario que se va a editar
  alEditarUsuario: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ show, manejarCierre, usuario, alEditarUsuario }) => {
  // Estado para el formulario y errores
  const [formData, setFormData] = useState({ nombre: '', email: '', rol: 'viewer' });
  const [error, setError] = useState<string | null>(null);

  // UseEffect para rellenar el formulario con los datos del usuario seleccionado.
  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      });
    }
  }, [usuario]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
    // Actualizar
  const manejarActualizarUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!usuario) return;

    try {
      const respuesta = await apiLocal.patch(`/usuarios/${usuario.id}`, formData);

      alEditarUsuario(respuesta.data);
      manejarCierre();
    } catch (err: any) {
      const mensajeError = err.respuesta?.data?.message || 'Error al actualizar el usuario.';
      setError(Array.isArray(mensajeError) ? mensajeError.join(', ') : mensajeError);
    }
  };

  return (
    <Modal show={show} onHide={manejarCierre}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario (ID: {usuario?.id})</Modal.Title>
      </Modal.Header>
      <Form onSubmit={manejarActualizarUsuario}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={formData.nombre} onChange={manejarCambio} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={manejarCambio} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="rol" value={formData.rol} onChange={manejarCambio}>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={manejarCierre}>Cancelar</Button>
          <Button variant="primary" type="submit">Guardar Cambios</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditUserModal;