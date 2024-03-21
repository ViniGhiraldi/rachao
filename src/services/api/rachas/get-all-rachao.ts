'use server'

import { IRachao } from "@/models/rachao";
import { cookies } from "next/headers";

interface IResponseSuccess extends Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local' | 'status' | 'createdAt'>{
    _count: {
        jogadores: number;
    }
}

export const getAllRachao = async () => {
    const sessionId = cookies().get('sessionId');

    if(!sessionId) return;

    try {
        const response = await fetch(`http://localhost:3333/rachao/all/${sessionId.value}`, {
            method: 'GET',
            next: {
                tags: ['get-all-rachao']
            }
        })

        const { data } = await response.json() as {data: IResponseSuccess[]};

        return data;
    } catch (error) {
        console.log(error);
    }
}