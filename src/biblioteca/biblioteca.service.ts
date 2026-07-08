<<<<<<< HEAD
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
=======
import { Injectable, NotFoundException } from '@nestjs/common';

type Livro = {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  anoPublicacao?: string;
  isEmprestado: boolean;
};

@Injectable()
export class BibliotecaService {
  private livros: Livro[] = [];

  listar(categoria?: string, autor?: string, anoPublicacao?: string) {
    let resultado = [...this.livros];

    if (autor) {
      resultado = resultado.filter((l) => l.autor === autor);
    }

    if (categoria) {
      resultado = resultado.filter((l) => l.categoria === categoria);
    }

    if (anoPublicacao) {
      resultado = resultado.filter((l) => l.anoPublicacao === anoPublicacao);
    }

    return resultado;
  }

  buscarPorId(id: number) {
    const livro = this.livros.find((item) => item.id === id);

    if (!livro) {
      throw new NotFoundException('Livro não encontrado');
    }

    return livro;
  }

  criar(dados: Omit<Livro, 'id' | 'isEmprestado'>) {
    const novoId =
      this.livros.length > 0
        ? Math.max(...this.livros.map((l) => l.id)) + 1
        : 1;

    const novoLivro = { id: novoId, isEmprestado: false, ...dados };
    this.livros.push(novoLivro);

    return novoLivro;
  }

  remover(id: number) {
    const existe = this.livros.some((l) => l.id === id);

    if (!existe) {
      throw new NotFoundException('Livro não encontrado');
    }

    this.livros = this.livros.filter((l) => l.id !== id);
  }

  atualizarParcial(id: number, dados: Partial<Omit<Livro, 'id'>>) {
    const livro = this.buscarPorId(id);
    const livroAtualizado = { ...livro, ...dados };

    this.livros = this.livros.map((item) =>
      item.id === id ? livroAtualizado : item,
    );

    return livroAtualizado;
>>>>>>> origin/master
  }
}
