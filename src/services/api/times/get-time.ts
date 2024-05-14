import { environment } from "@/environment/environment";
import { IJogador } from "@/models/jogador";
import { ITime } from "@/models/time";

interface IJogadorResponse extends Pick<IJogador, 'id' | 'nome' | 'imagem' | 'presenca'>{
    time?: {
        nome: string;
    }
}

interface ITimeResponse extends Pick<ITime, 'id' | 'createdAt' | 'imagem' | 'nome'>{
    jogadores: Omit<IJogadorResponse, 'time'>[];
    _count: {
        jogadores: number;
    }
}

interface IResponse{
    time: ITimeResponse;
    jogadores: IJogadorResponse[];
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