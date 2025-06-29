import { IsString, IsEmail, MinLength, IsOptional, IsIn,} from 'class-validator';

export class CrearUsuarioDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  nombre: string;

  @IsEmail({}, { message: 'El formato del email no es válido.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;

  @IsOptional()
  @IsIn(['admin', 'editor', 'viewer'], { message: 'El rol no es válido.' })
  rol?: string;
}
