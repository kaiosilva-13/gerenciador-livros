import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @Get()
  listarTodos() {
    return this.usuariosService.listarTodos();
  }
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.buscarPorId(id);
  }
}
