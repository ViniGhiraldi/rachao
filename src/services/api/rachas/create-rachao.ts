'use server'

import { environment } from "@/environment/environment";
import { IRachao } from "@/models/rachao";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";
import { cookies } from "next/headers";

interface IBody extends Pick<IRachao, 'nome' | 'senha' | 'modalidade' | 'diahora' | 'local'>{}

interface IResponse extends Pick<IRachao, 'id' | 'nome'>{
    sessionId: string;
}

export const createRachao = async (body: IBody) => {
    const cookiesInstance = cookies();

    const sessionId = cookiesInstance.get('sessionId');

    const url = sessionId ? `${environment.baseURL}/rachao?sessionId=${sessionId.value}` : `${environment.baseURL}/rachao`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const { data } = await response.json() as {data: IResponse};

        if(!sessionId) {
            cookies().set('sessionId', data.sessionId, {
                maxAge: 60 * 60 * 24 * 60, // 60 days
                path: '/',
                httpOnly: true
            });
        }

        if(response.status === 201){
            revalidateTagOnServer('get-all-rachao');
            return {...data, sessionId: undefined};
        }

        return 'Erro ao criar rachão. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao criar rachão. Tente novamente mais tarde.';
    }
}