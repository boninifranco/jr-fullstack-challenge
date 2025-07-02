import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  providers: [SeedService],
})
export class SeedModule {}
