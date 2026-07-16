import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';

@Module({
  imports: [BibliotecaModule, UsuariosModule, EmprestimosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}