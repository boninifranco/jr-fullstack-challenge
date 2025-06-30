import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { ActualizarUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles('admin')
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
  @Roles('admin', 'editor')
  actualizarUsuario(@Param('id', ParseIntPipe) id: number, @Body() actualizarUsuarioDto: ActualizarUsuarioDto) {
    return this.usuariosService.actualizarUsuario(id, actualizarUsuarioDto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.eliminarUsuario(id);
  }
}