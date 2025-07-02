# Desafío Técnico - Gestión de Usuarios y Pokédex - Franco Bonini

Aplicación web full-stack desarrollada como parte de un desafío técnico. El proyecto consiste en un backend con API REST construido en NestJS que gestiona una base de datos MySQL, y un frontend construido en React que consume tanto la API propia como la PokeAPI pública.

## Funcionalidades Principales

* **Autenticación de Usuarios:** Sistema de login seguro basado en Tokens Web JSON (JWT) con expiración.
* **Gestión de Usuarios (CRUD):** Un panel de administración protegido donde los usuarios con rol `admin` pueden Crear, Leer, Actualizar y Eliminar otros usuarios.
* **Autorización Basada en Roles (RBAC):** El acceso a las funcionalidades de gestión está restringido por roles (`admin`, `editor`), tanto en el backend (Guards) como en el frontend (componentes de ruta protegida y renderizado condicional).
* **Pokédex Interactiva:** Visualización de una lista de Pokémon consumiendo la API pública `pokeapi.co`, con paginación para navegar entre los resultados.
* **Seguridad:** Las contraseñas se almacenan de forma segura utilizando hasheo con `bcryptjs`. Las credenciales y claves secretas se gestionan a través de variables de entorno.
* **Base de Datos Pre-cargada (Seeding):** La aplicación crea automáticamente un usuario administrador y un usuario de prueba al iniciarse por primera vez, facilitando las pruebas iniciales.

## Stack Tecnológico

### Backend
* **Node.js** con **NestJS**
* **TypeScript**
* **TypeORM** como ORM para la base de datos
* **MySQL**
* **Passport.js** con estrategias de JWT para autenticación
* **Bcryptjs** para el hasheo de contraseñas
* **`@nestjs/config`** para la gestión de variables de entorno

### Frontend
* **React** con **TypeScript**
* **React Router DOM** para la navegación y rutas protegidas
* **Axios** para las peticiones a las APIs (con instancias y interceptores)
* **React-Bootstrap** & **Bootstrap** para la interfaz de usuario y estilos
* **`jwt-decode`** para la inspección de tokens en el cliente

## Requisitos Previos

Para poder ejecutar este proyecto, necesitás tener instalado:
* Node.js
* npm
* Un servidor de MySQL corriendo localmente

## Instalación y Configuración

Sigue estos pasos para poner el proyecto en funcionamiento en tu entorno local.

**1. Clonar el Repositorio**
```bash
git clone [https://github.com/boninifranco/jr-fullstack-challenge.git](https://github.com/boninifranco/jr-fullstack-challenge.git)
cd jr-fullstack-challenge
```

**2. Configurar la Base de Datos**
Abre tu cliente de MySQL (MySQL Workbench, DBeaver, etc.) con un usuario con privilegios (como `root`) y ejecuta las siguientes sentencias para crear la base de datos y el usuario necesarios:
```sql
CREATE DATABASE challenge_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'challenge_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON challenge_db.* TO 'challenge_user'@'localhost';
FLUSH PRIVILEGES;
```
**Nota:** Reemplazar `'tu_contraseña_segura'` por una contraseña que elijas.

**3. Configurar el Backend**
```bash
# Navegar a la carpeta del backend
cd backend

# Crear el archivo de variables de entorno a partir del ejemplo
.env.example .env
```
Abrir el nuevo archivo `.env` y rellenar los valores correspondientes.

```bash
# Instalar dependencias del backend
npm install
```

**4. Configurar el Frontend**
```bash
# Desde la raíz del proyecto, navegar a la carpeta del frontend
cd ../frontend

# Instalar dependencias del frontend
npm install
```

## Ejecución de la Aplicación

Necesitás tener **dos terminales abiertas** para correr el proyecto simultáneamente.

* **Terminal 1 (para iniciar el Backend):**
    ```bash
    cd backend
    npm run start:dev
    ```
    El servidor se iniciará en `http://localhost:3000`. La primera vez que se inicie con la base de datos vacía, el seeder creará los usuarios por defecto.

* **Terminal 2 (para iniciar el Frontend):**
    ```bash
    cd frontend
    npm run dev
    ```
    La aplicación de React se iniciará en `http://localhost:3001`. Abre esta URL en tu navegador.

## Credenciales de Acceso

Podés usar las siguientes cuentas creadas por el seeder para probar la aplicación:

* **Rol Administrador:**
    * **Email:** `admin@challenge.com`
    * **Contraseña:** `adminpassword123`
* **Rol Viewer (visualizador):**
    * **Email:** `viewer@challenge.com`
    * **Contraseña:** `viewerpassword123`

## Consideraciones de Diseño y Posibles Mejoras

* **Registro de Usuarios vs. Creación por Administrador:**
   - El challenge especifica que el CRUD de usuarios completo debe ser una función de administrador. Se podría añadir un feature que incluya el registro desde la LoginPage, para que cualquier usuario se pueda registrar.
   - Se podría incluir una Busqueda/filtrado de Pokédex por id, nombre, o tipo de pokemon.
