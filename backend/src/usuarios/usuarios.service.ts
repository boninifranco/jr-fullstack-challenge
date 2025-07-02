import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { ActualizarUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearUsuario(crearUsuarioDto: CrearUsuarioDto): Promise<Omit<Usuario, 'password'>> {

    const passwordPlana = crearUsuarioDto.password;

    const passwordHasheada = await bcrypt.hash(passwordPlana, 10);

    const nuevoUsuario = this.usuarioRepository.create({
      ...crearUsuarioDto,
      password: passwordHasheada,
    });
    await this.usuarioRepository.save(nuevoUsuario);

    const {password, ...usuarioSinPassword } = nuevoUsuario;

    return usuarioSinPassword;
  }

  async obtenerTodosLosUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async obtenerUsuarioPorId(id: number): Promise <Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: {id}});
    if (!usuario){
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
    }
    return usuario;
  }

  async actualizarUsuario(id: number, actualizarUsuarioDto: ActualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...actualizarUsuarioDto,
    });
    if (!usuario){
      throw new NotFoundException(`No se puede actualizar. Usuario con ID "${id}" no encontrado.`);
    }
    return this.usuarioRepository.save(usuario);
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.obtenerUsuarioPorId(id);
    await this.usuarioRepository.remove(usuario);
  }

  //Busca un usuario por su email
  async encontrarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository
    .createQueryBuilder('usuario')
    .addSelect('usuario.password')
    .where('usuario.email = :email', {email})
    .getOne();
  }
}
