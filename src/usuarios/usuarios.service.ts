import { Injectable, NotFoundException } from '@nestjs/common';
export interface Usuario {
  id: number;
  nome: string;
}
@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    { id: 1, nome: 'Matheus' },
    { id: 2, nome: 'Ronald' },
    { id: 3, nome: 'Iago' },
    { id: 4, nome: 'Cleiton' },
    { id: 5, nome: 'Aninha' },
  ];
  listarTodos() {
    return this.usuarios;
  }
  buscarPorId(id: number) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }
}
