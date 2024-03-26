'use server'

import { environment } from "@/environment/environment"
import { revalidateTag } from "next/cache";

export const deleteRachao = async (id: string) => {
    try {
        const response = await fetch(`${environment.baseURL}/rachao/${id}`, {
            method: 'DELETE'
        })

        if(response.status === 200){
            revalidateTag('get-all-rachao');
            return 'Rachão deletado com sucesso!';
        }
        
        return 'Erro ao deletar rachão.';
    } catch (error) {
        console.log(error);
        return 'Erro ao deletar rachão.';
    }
}