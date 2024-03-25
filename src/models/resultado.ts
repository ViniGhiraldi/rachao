import { ITime } from "./time";

export interface IResultado{
    id: string;
    timeCasa: ITime;
    timeVisitante: ITime;
    timeVencedor?: ITime;
    resultado: string;
    duracao: string;
    createdAt: Date;
}