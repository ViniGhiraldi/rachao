import { environment } from "@/environment/environment";
import { IResultado } from "@/models/resultado";
import { ITime } from "@/models/time";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Pick<IResultado, 'timeCasaPontos' | 'timeVisitantePontos'>{
    timeCasaId: string;
    timeVencedorId?: string;
    timeVisitanteId: string;
}

interface ITimeForResultado extends Pick<ITime, 'nome' | 'imagem'>{}

interface IResponse extends Pick<IResultado, 'id' | 'timeCasaPontos' | 'timeVisitantePontos'>{
    timeCasa: ITimeForResultado;
    timeVencedor?: ITimeForResultado;
    timeVisitante: ITimeForResultado;
}

export const createResultado = async (id: string, body: IBody) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/resultados/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const { data } = await response.json() as {data: IResponse};

        if(response.status === 201){
            revalidateTagOnServer('get-all-times');
            revalidateTagOnServer('get-all-resultados');
            return data;
        }

        return 'Erro ao criar resultado. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao criar resultado. Tente novamente mais tarde.';
    }
}