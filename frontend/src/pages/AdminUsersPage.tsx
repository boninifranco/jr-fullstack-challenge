import React, { useState, useEffect } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import apiLocal from "../api/apiLocal";
import CreateUserModal from "../components/CreateUserModal";
import EditUserModal from "../components/EditUserModal";

// Interfaz para el objeto User (debe coincidir con lo que devuelve tu API)
interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "admin" | "editor" | "viewer";
}

//Página de administración para gestionar los usuarios de la aplicación.
function AdminUsersPage() {
  // Estados para los usuarios, carga y errores
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState<User | null>(null);

  //Se obtiene la lista de usuarios cuando el componente se monta.
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        setEstaCargando(true);

        const response = await apiLocal.get("/usuarios");
        setUsuarios(response.data);
      } catch (err: any) {
        const mensajeError =
          err.response?.data?.message || "No se pudieron cargar los usuarios.";
        setError(mensajeError);
        console.error(err);
      } finally {
        setEstaCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  // Eliminar usuario
  const manejarEliminarUsuario = async (idUsuario: number) => {
    if (
      !window.confirm(
        `¿Estás seguro de que quieres eliminar al usuario con ID ${idUsuario}?`
      )
    ) {
      return;
    }

    try {
      //DELETE
      await apiLocal.delete(`/usuarios/${idUsuario}`);

      setUsuarios((usuariosActuales) =>
        usuariosActuales.filter((usuario) => usuario.id !== idUsuario)
      );

      alert("Usuario eliminado con éxito.");
    } catch (err: any) {
      const mensajeError =
        err.response?.data?.message || "No se pudo eliminar el usuario.";
      setError(mensajeError); // Mostramos el error en la alerta principal
      console.error(err);
    }
  };
  // Crear Usuario
  const manejarUsuarioCreado = (nuevoUsuario: User) => {
    setUsuarios((usuariosActuales) => [...usuariosActuales, nuevoUsuario]);
  };

  // Editar Usuario
  const abrirModalEdicion = (usuario: User) => {
    setUsuarioAEditar(usuario);
    setMostrarModalEditar(true);
  };
  const manejarUsuarioActualizado = (usuarioActualizado: User) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === usuarioActualizado.id ? usuarioActualizado : u
      )
    );
  };

  // Renderizado condicional mientras carga o si hay un error
  if (estaCargando)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  // Renderizado principal de la tabla con los usuarios
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Gestión de Usuarios</h1>

      <div className="mb-3">
        <Button variant="success" onClick={() => setMostrarModalCrear(true)}>
          + Crear Nuevo Usuario
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(usuario)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => manejarEliminarUsuario(usuario.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateUserModal
        show={mostrarModalCrear}
        manejarCierre={() => setMostrarModalCrear(false)}
        alCrearUsuario={manejarUsuarioCreado}
      />
       <EditUserModal
        show={mostrarModalEditar}
        manejarCierre={() => setMostrarModalEditar(false)}
        usuario={usuarioAEditar}
        alEditarUsuario={manejarUsuarioActualizado}
      />
    </Container>
  );
}

export default AdminUsersPage;
