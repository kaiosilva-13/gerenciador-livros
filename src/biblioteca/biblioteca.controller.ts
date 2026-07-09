import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Controller('livros')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  // Listagem de livros com filtros opcionais por query parameters
  @Get()
  listar(
    @Query('categoria') categoria?: string,
    @Query('autor') autor?: string,
    @Query('anoPublicacao') anoPublicacao?: string,
  ) {
    return this.bibliotecaService.listar(categoria, autor, anoPublicacao);
  }

  // Busca de livro especifico por ID numerico
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.bibliotecaService.buscarPorId(id);
  }

  // Cadastro de novo livro mapeando dataPublicacao para a estrutura do Service
  @Post()
  criar(@Body() dados: CreateLivroDto) {
    return this.bibliotecaService.criar({
      titulo: dados.titulo,
      autor: dados.autor,
      categoria: dados.categoria,
      anoPublicacao: Number(dados.anoPublicacao),
    });
  }

  // Atualizacao parcial de dados do livro por ID
  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateLivroDto,
  ) {
    return this.bibliotecaService.atualizarParcial(id, dados);
  }

  // Remocao de livro por ID com retorno 204 No Content
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.bibliotecaService.remover(id);
  }
}
