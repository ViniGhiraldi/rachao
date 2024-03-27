'use server'

import { environment } from "@/environment/environment";
import { IRachao } from "@/models/rachao";
import { revalidateTag } from "next/cache";

interface IBody extends Partial<Pick<IRachao, 'nome' | 'modalidade' | 'diahora' | 'local' | 'regras' | 'status'>>{
}

export const putRachao = async (id: string, body: IBody) => {
    try {
        const response = await fetch(`${environment.baseURL}/rachao/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if(response.status === 200){
            revalidateTag('get-rachao');
            return `As alterações foram salvas!`
        }

        return 'Erro ao alterar o rachão. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao alterar o rachão. Tente novamente mais tarde.';
    }
}