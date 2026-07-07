import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import {  CreateLivroDto } from './dto/create-livro.dto';
import {  UpdateLivroDto } from './dto/update-livro.dto';

@Controller('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Post()
  create(@Body() createLivroDto: CreateLivroDto) {
    return this.bibliotecaService.create(createLivroDto);
  }

  @Get()
  findAll() {
    return this.bibliotecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bibliotecaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLivroDto: UpdateLivroDto) {
    return this.bibliotecaService.update(+id, updateLivroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bibliotecaService.remove(+id);
  }
}
