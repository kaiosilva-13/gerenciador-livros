// Use PartialType from @nestjs/swagger to avoid dependency on @nestjs/mapped-types
import { PartialType } from '@nestjs/swagger';
import { CreateLivroDto } from './create-livro.dto';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateLivroDto extends PartialType(CreateLivroDto) {
    @IsInt({ message: 'O ID deve ser um número inteiro' })
    @IsNotEmpty({ message: 'O ID do livro é obrigatório para atualização' })
    @Min(1, { message: 'O ID do livro deve ser maior que zero' }) 
    id!: number;
}
