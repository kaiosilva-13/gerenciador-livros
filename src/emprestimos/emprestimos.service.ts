import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BibliotecaService } from '../biblioteca/biblioteca.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CriarEmprestimoDto } from './dto/criar-emprestimo.dto';
export interface Emprestimo {
  id: number;
  usuarioId: number;
  livroId: number;
  dataEmprestimo: Date;
}
@Injectable()
export class EmprestimosService {
  private emprestimos: Emprestimo[] = [];
  constructor(
    private readonly bibliotecaService: BibliotecaService,
    private readonly usuariosService: UsuariosService,
  ) {}
  criar(dto: CriarEmprestimoDto) {
    // 1. Valida se o usuário leitor existe no sistema
    this.usuariosService.buscarPorId(dto.usuarioId);
    // 2. Valida se o livro buscado existe
    const livro = this.bibliotecaService.buscarPorId(dto.livroId);
    // 3. Valida se o livro já se encontra indisponível
    if (livro.isEmprestado) {
      throw new BadRequestException(
        'Este livro já está emprestado no momento.',
      );
    }
    // 4. VALIDAÇÃO DE NEGÓCIO: Limite de 3 empréstimos simultâneos
    const emprestimosAtivos = this.emprestimos.filter(
      (emp) => emp.usuarioId === dto.usuarioId,
    );
    if (emprestimosAtivos.length >= 3) {
      throw new BadRequestException(
        'Operação negada! O leitor já possui o limite de 3 livros emprestados simultaneamente.',
      );
    }
    // 5. Instancia o novo registro de empréstimo
    const novoId =
      this.emprestimos.length > 0
        ? Math.max(...this.emprestimos.map((e) => e.id)) + 1
        : 1;
    const novoEmprestimo: Emprestimo = {
      id: novoId,
      usuarioId: dto.usuarioId,
      livroId: dto.livroId,
      dataEmprestimo: new Date(),
    };
    this.emprestimos.push(novoEmprestimo);
    // 6. Atualiza o estado do livro no catálogo para emprestado
    this.bibliotecaService.atualizarParcial(dto.livroId, {
      isEmprestado: true,
    });
    return novoEmprestimo;
  }
  listarTodos() {
    return this.emprestimos;
  }
  devolver(livroId: number) {
    // 1. Verifica se existe um empréstimo ativo para este livro
    const indiceEmprestimo = this.emprestimos.findIndex(
      (emp) => emp.livroId === livroId,
    );

    if (indiceEmprestimo === -1) {
      throw new NotFoundException(
        'Não foi encontrado nenhum empréstimo ativo para este livro.',
      );
    }

    // 2. Remove o registro de empréstimo da nossa lista na memória
    this.emprestimos.splice(indiceEmprestimo, 1);

    // 3. Atualiza o status do livro para "disponível" (isEmprestado: false)
    this.bibliotecaService.atualizarParcial(livroId, { isEmprestado: false });

    return { message: 'Livro devolvido com sucesso!' };
  }
}
