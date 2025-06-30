import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async iniciarSesion(@Body() loginUsuarioDto: LoginUsuarioDto){
        const usuarioValidado = await this.authService.validarUsuario(
            loginUsuarioDto.email,
            loginUsuarioDto.password,
        );

        if (!usuarioValidado) {
            throw new UnauthorizedException('Credenciales incorrectas.')
        }
        return this.authService.login(usuarioValidado);
    }
}
