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
      resultado = resultado.filter(
        (l) => l.anoPublicacao === anoPublicacao,
      );
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
}
