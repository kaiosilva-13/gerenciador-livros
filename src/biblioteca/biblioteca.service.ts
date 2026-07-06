import { Injectable } from '@nestjs/common';

type Livro = {
    id: number;
    titulo: string;
    autor:string;
    categoria:string;
    anoPublicacao?:number;
    isEmprestado:boolean;
}

@Injectable()
export class BibliotecaService {}
