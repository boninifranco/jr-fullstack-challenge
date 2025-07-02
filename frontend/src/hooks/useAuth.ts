import { jwtDecode } from "jwt-decode";

//Decodificación de jwt Token para obtener los roles
interface AuthPayload {
  id: number;
  email: string;
  rol: "admin" | "editor" | "viewer";
}

export const useAuth = () => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    return { user: null, isAuthenticated: false };
  }

  try {
    const tokenDecodificado = jwtDecode<AuthPayload>(token);

    return { user: tokenDecodificado, isAuthenticated: true };
  } catch (error) {
    console.error("Token inválido:", error);
    return { user: null, isAuthenticated: false };
  }
};
