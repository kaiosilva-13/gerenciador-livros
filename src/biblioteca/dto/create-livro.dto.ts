import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateLivroDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  titulo!: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do autor é obrigatório' })
  autor!: string;

  @IsString()
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoria!: string;

  @IsInt({ message: 'O ano de publicação deve ser um número inteiro' })
  @IsOptional()
  anoPublicacao!: number;
}
