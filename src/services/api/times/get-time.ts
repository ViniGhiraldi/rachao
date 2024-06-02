import { environment } from "@/environment/environment";
import { IJogador } from "@/models/jogador";
import { ITime } from "@/models/time";

interface IJogadorSemTime extends Pick<IJogador, 'id' | 'nome' | 'imagem' | 'presenca'>{}

interface IJogadorComTime extends IJogadorSemTime{
    time?: {
        nome: string;
    }
}

interface IJogadorResponse{
    semTime: IJogadorSemTime[];
    comTime: IJogadorComTime[];
}

interface ITimeResponse extends Pick<ITime, 'id' | 'createdAt' | 'imagem' | 'nome'>{
    jogadores: IJogadorSemTime[];
    _count: {
        jogadores: number;
    }
}

interface IResponse{
    time: ITimeResponse;
    jogadores: IJogadorResponse;
} 

export const getTime = async (rachaoId: string, timeId: string) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/times/${rachaoId}/${timeId}`, {
            method: 'GET',
            next: {
                tags: ['get-time'],
            }
        })

        const { data } = await response.json() as {data: IResponse};

        if(response.status === 200 && data.time) return data;

        return 'Time não encontrado ou existente.';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}