export class LivroEntity {
  id!: string; 
  titulo!: string;
  autor!: string;
  categoria!: string;
  dataPublicacao?: string;

  isEmprestado!: boolean;
  dataEmprestimo?: Date;
  idUsuarioEmprestimo?: string;
}