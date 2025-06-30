import { IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class LoginUsuarioDto {
    @IsEmail({}, { message: 'El formato del email no es válido.'})
    email: string;

    @IsString({ message: 'La contraseña debe ser un texto.'})
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.'})
    password: string;
}