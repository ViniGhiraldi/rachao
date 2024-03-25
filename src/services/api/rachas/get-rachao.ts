import { environment } from "@/environment/environment"
import { IDespesa } from "@/models/despesa";
import { IJogador } from "@/models/jogador"
import { IRachao } from "@/models/rachao"
import { IResultado } from "@/models/resultado";
import { ITime } from "@/models/time";

interface IResponseTimes extends Omit<ITime, 'createdAt'>{
    _count: {
        jogadores: number;
    }
}

interface IResponse extends Omit<IRachao, 'senha'>{
    jogadores: IJogador[];
    times: IResponseTimes[];
    despesas: Omit<IDespesa, 'createdAt'>[];
    resultados: IResultado[];
    _count: {
        jogadores: number;
        times: number;
        despesas: number;
        resultados: number;
    }
}

export const getRachao = async (id: string) => {
    try {
        const response = await fetch(`${environment.baseURL}/rachao/${id}`, {
            method: 'GET',
            next: {
                tags: ['get-rachao']
            }
        })

        const { data } = await response.json() as {data: IResponse};

        if(data) return data;

        return 'Rachão não encontrado ou existente!';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}