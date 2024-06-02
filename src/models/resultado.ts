import { ITime } from "./time";

export interface IResultado{
    id: string;
    timeCasa: ITime;
    timeVisitante: ITime;
    timeVencedor?: ITime;
    timeVisitantePontos: number;
    timeCasaPontos: number;
    createdAt: Date;
}