import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { ActualizarUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crearUsuario(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(crearUsuarioDto);
  }

  @Get()
  obtenerTodosLosUsuarios() {
    return this.usuariosService.obtenerTodosLosUsuarios();
  }

  @Get(':id')
  obtenerUsuarioPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerUsuarioPorId(id);
  }

  @Patch(':id')
  actualizarUsuario(@Param('id', ParseIntPipe) id: number, @Body() actualizarUsuarioDto: ActualizarUsuarioDto) {
    return this.usuariosService.actualizarUsuario(id, actualizarUsuarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.eliminarUsuario(id);
  }
}