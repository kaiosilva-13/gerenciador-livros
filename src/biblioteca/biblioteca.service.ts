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

  criar(dados: Omit<Livro, 'id'>){
    const novoId = this.livros.length > 0? Math.max(...this.livros.map((l) => l.id)) + 1 : 1;

    const novoLivro = {id: novoId,...dados};
    this.livros.push(novoLivro);

    return novoLivro;
  }


}
