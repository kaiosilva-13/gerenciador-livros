import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateLivroDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  autor?: string;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsNumber()
  @IsOptional()
  anoPublicacao?: number;

  @IsString()
  @IsOptional()
  isEmprestado?: boolean;
}
