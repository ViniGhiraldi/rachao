import { environment } from "@/environment/environment";
import { IJogador } from "@/models/jogador";

export interface IGetAllJogadoresResponsePresenca{
    confirmados: IJogador[];
    pendentes: IJogador[];
}

export interface IGetAllJogadoresResponseTime{
    comTime: IJogador[];
    semTime: IJogador[];
}

export const getAllJogadores = async (id: string, list?: 'presenca' | 'time') => {
    const url = list ? `${environment.APIbaseURL}/jogadores/all/${id}?list=${list}` : `${environment.APIbaseURL}/jogadores/all/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            next: {
                tags: ['get-all-jogadores'],
            }
        })

        const data = await response.json();

        if(response.status === 200) {
            if(list === 'presenca'){
                return (data as {data: IGetAllJogadoresResponsePresenca}).data;
            }
            if(list === 'time'){
                return (data as {data: IGetAllJogadoresResponseTime}).data;
            }
            const dataAsIJogador = (data as {data: IJogador[]}).data
            if(dataAsIJogador) return dataAsIJogador;
        };

        return 'Não há jogadores até o momento.';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}