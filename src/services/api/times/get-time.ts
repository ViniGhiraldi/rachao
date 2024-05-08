import { environment } from "@/environment/environment";
import { IJogador } from "@/models/jogador";
import { ITime } from "@/models/time";

interface IResponse extends Pick<ITime, 'id' | 'createdAt' | 'imagem' | 'nome'>{
    jogadores: Pick<IJogador, 'id' | 'nome' | 'imagem' | 'presenca'>[];
    _count: {
        jogadores: number;
    }
}

export const getTime = async (id: string) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/times/${id}`, {
            method: 'GET',
            next: {
                tags: ['get-time'],
            }
        })

        const { data } = await response.json() as {data: IResponse};

        if(response.status === 200 && data) return data;

        return 'Time não encontrado ou existente.';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}