import { environment } from "@/environment/environment";
import { IJogador } from "@/models/jogador";
import { ITime } from "@/models/time";

interface IResponseTime extends Pick<ITime, 'id' | 'nome'>{}

interface IResponse extends Omit<IJogador, 'time'>{
    time?: IResponseTime
}

export const getAllJogadores = async (id: string, orderBy: 'presenca' | 'time' = 'presenca') => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/jogadores/all/${id}?orderBy=${orderBy}`, {
            method: 'GET',
            next: {
                tags: ['get-all-jogadores'],
            }
        })

        const { data } = await response.json() as {data: IResponse[]};

        if(response.status === 200 && data.length) return data;

        return 'Não há jogadores até o momento.';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}