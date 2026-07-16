import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CriarEmprestimoDto } from './dto/criar-emprestimo.dto';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  // 1. Rota POST /emprestimos (Para registrar um novo empréstimo)
  @Post()
  criar(@Body() dto: CriarEmprestimoDto) {
    return this.emprestimosService.criar(dto);
  }

  // 2. Rota GET /emprestimos (Para podermos listar/visualizar todos os empréstimos ativos)
  @Get()
  listarTodos() {
    return this.emprestimosService.listarTodos();
  }

  // Adicione esta rota dentro do seu EmprestimosController:

  @Post('devolver/:livroId')
  devolver(@Param('livroId', ParseIntPipe) livroId: number) {
    return this.emprestimosService.devolver(livroId);
  }
}
