import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly usersService: UsuariosService) {}

  
  //Este método es llamado módulo se inicializa.
  async onModuleInit() {
    console.log('Ejecutando el Seeder para la base de datos...');
    await this.crearUsuariosPorDefecto();
  }

  
   //Método que revisa si hay usuarios en la BD. Si no hay, crea un admin y un viewer.
  async crearUsuariosPorDefecto() {
    
    const usuarios = await this.usersService.obtenerTodosLosUsuarios();

    if (usuarios.length === 0) {
      console.log('Base de datos de usuarios vacía. Creando usuarios por defecto...');
      
      await this.usersService.crearUsuario({
        nombre: 'Admin del Sistema',
        email: 'admin@admin.com',
        password: 'adminpassword123',
        rol: 'admin',
      });
      
      await this.usersService.crearUsuario({
        nombre: 'Usuario de Prueba',
        email: 'viewer@viewer.com',
        password: 'viewerpassword123',
        rol: 'viewer',
      });

          await this.usersService.crearUsuario({
        nombre: 'Editor de Prueba',
        email: 'editor@editor.com',
        password: 'editorpassword123',
        rol: 'editor',
      });

      console.log('¡Usuarios por defecto creados con éxito!');
    }
  }
}