import { environment } from "@/environment/environment";
import { IResultado } from "@/models/resultado";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Pick<IResultado, 'timeCasaPontos' | 'timeVisitantePontos'>{
    timeCasaId: string;
    timeVisitanteId: string;
}

export const putResultado = async (id: string, body: IBody) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/resultados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-times');
            revalidateTagOnServer('get-all-resultados');
            return `As alterações foram salvas!`
        }

        return 'Erro ao alterar resultado. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao alterar resultado. Tente novamente mais tarde.';
    }
}