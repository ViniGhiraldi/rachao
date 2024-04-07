'use server'

import { environment } from "@/environment/environment";
import { IRachao } from "@/models/rachao";
import { cookies } from "next/headers";

interface IResponse extends Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local' | 'status' | 'createdAt'>{
    _count: {
        jogadores: number;
    }
}

export const getAllRachao = async () => {
    const sessionId = cookies().get('sessionId');

    if(!sessionId) return 'Não há nenhum rachão por aqui. Crie um para começar!';

    try {
        const response = await fetch(`${environment.APIbaseURL}/rachao/all/${sessionId.value}`, {
            method: 'GET',
            next: {
                tags: ['get-all-rachao']
            }
        })

        const { data } = await response.json() as {data: IResponse[]};

        if(response.status === 200 && data.length) return data;

        return 'Não há nenhum rachão por aqui. Crie um para começar!';
    } catch (error) {
        console.log(error);
        return 'Não há nenhum rachão por aqui. Crie um para começar!';
    }
}