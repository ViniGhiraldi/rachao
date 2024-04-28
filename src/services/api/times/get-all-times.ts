import { environment } from "@/environment/environment";
import { ITime } from "@/models/time";

interface IResponse extends Pick<ITime, 'id' | 'createdAt' | 'imagem' | 'nome'>{
    _count: {
        jogadores: number;
        resultadosTimeVencedor: number;
    }
}

export const getAllTimes = async (id: string) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/times/all/${id}`, {
            method: 'GET',
            next: {
                tags: ['get-all-times'],
            }
        })

        const { data } = await response.json() as {data: IResponse[]};

        if(response.status === 200 && data.length) return data;

        return 'Não há times até o momento.';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}