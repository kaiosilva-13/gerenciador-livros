import { IsInt, IsNotEmpty } from 'class-validator';
export class CriarEmprestimoDto {
  @IsInt()
  @IsNotEmpty()
  usuarioId!: number;
  @IsInt()
  @IsNotEmpty()
  livroId!: number;
}
