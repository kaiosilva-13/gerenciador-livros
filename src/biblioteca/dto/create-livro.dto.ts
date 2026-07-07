import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateLivroDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  titulo!: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do autor é obrigatório'})
  autor!: string;

  @IsString()
  @IsNotEmpty({ message: 'A categoria é obrigatória'})
  categoria!: string;

  @IsDateString() 
  @IsOptional()
  dataPublicacao?: string;
}