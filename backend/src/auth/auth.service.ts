import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  //Valida las credenciales de un usuario con respecto a la base de datos.
  async validarUsuario(
    email: string,
    pass: string,
  ): Promise<Omit<Usuario, 'password'> | null> {
    const usuario = await this.usuariosService.encontrarPorEmail(email);

    if (usuario && (await bcrypt.compare(pass, usuario.password))) {
      const { password, ...resultado } = usuario;
      return resultado;
    }

    return null;
  }

  async login (usuario: any) {
    const payload = {
      email: usuario.email,
      sub: usuario.id,
      rol: usuario.rol,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
