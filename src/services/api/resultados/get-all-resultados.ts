import { environment } from "@/environment/environment";
import { IResultado } from "@/models/resultado";
import { ITime } from "@/models/time";

interface ITimeForResultado extends Pick<ITime, 'id' | 'nome' | 'imagem'>{}

interface IResponse extends Pick<IResultado, 'id' | 'timeCasaPontos' | 'timeVisitantePontos' | 'createdAt'>{
    timeCasa: ITimeForResultado;
    timeVencedor?: ITimeForResultado;
    timeVisitante: ITimeForResultado;
}

export const getAllResultados = async (id: string) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/resultados/all/${id}`, {
            method: 'GET',
            next: {
                tags: ['get-all-resultados']
            }
        })

        const { data } = await response.json() as {data: IResponse[]};

        if(response.status === 200 && data.length) return data;

        return 'Não há resultados até o momento.';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}