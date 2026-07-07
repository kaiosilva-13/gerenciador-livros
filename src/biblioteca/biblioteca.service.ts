import { Injectable } from '@nestjs/common';
import {  CreateLivroDto } from './dto/create-livro.dto';
import {  UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class BibliotecaService {
  create(createLivroDto: CreateLivroDto) {
    return 'Essa ação cria um novo livro na biblioteca';
  }

  findAll() {
    return `Essa ação retorna todos os livros da biblioteca`;
  }

  findOne(id: number) {
    return `Essa ação retorna o livro com ID ${id}`;
  }

  update(id: number, updateLivroDto: UpdateLivroDto) {
    return `Essa ação atualiza o livro com ID ${id}`;
  }

  remove(id: number) {
    return `Essa ação remove o livro com ID ${id}`;
  }
}
