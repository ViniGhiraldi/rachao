import { IImagem } from "./imagem";
import { IJogador } from "./jogador";

export interface ITime{
    id: string;
    nome: string;
    createdAt: Date;
    jogadores: IJogador[]
    imagem?: IImagem
}