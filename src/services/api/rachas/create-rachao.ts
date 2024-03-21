'use server'

import { IRachao } from "@/models/rachao";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface IBody extends Pick<IRachao, 'nome' | 'senha' | 'modalidade' | 'diahora' | 'local'>{}

interface IResponse extends Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local' | 'status'>{
    sessionId: string;
}

export const createRachao = async (body: IBody) => {
    const cookiesInstance = cookies();

    const sessionId = cookiesInstance.get('sessionId');

    const url = sessionId ? `http://localhost:3333/rachao?sessionId=${sessionId.value}` : `http://localhost:3333/rachao`

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

        revalidateTag('get-all-rachao');

        return {...data, sessionId: undefined};
    } catch (error) {
        console.log(error);
    }
}