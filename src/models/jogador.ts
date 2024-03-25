import { IImagem } from "./imagem";
import { ITime } from "./time";

export interface IJogador{
    id: string;
    time?: ITime;
    nome: string;
    nota?: number;
    presenca: boolean;
    createdAt: Date;
    imagem?: IImagem
}