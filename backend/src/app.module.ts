import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [UsuariosModule, SeedModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Password',
    database: 'challenge_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), AuthModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
