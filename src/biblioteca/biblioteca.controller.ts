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
import { CreateLivroDto } from './criar-livros.dto';
import { UpdateLivroDto } from './atualizar-livros.dto';

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
}