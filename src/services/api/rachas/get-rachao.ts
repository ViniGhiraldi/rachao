import { environment } from "@/environment/environment";
import { IRachao } from "@/models/rachao";
import { IResultado } from "@/models/resultado";

interface IResponse extends Omit<IRachao, 'senha'>{
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
        const response = await fetch(`${environment.APIbaseURL}/rachao/${id}`, {
            method: 'GET',
            next: {
                tags: ['get-rachao'],
            }
        })

        const { data } = await response.json() as {data: IResponse};

        if(response.status === 200) return data;

        return 'Rachão não encontrado ou existente!';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}