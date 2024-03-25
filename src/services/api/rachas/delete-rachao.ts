'use server'

import { environment } from "@/environment/environment"
import { revalidateTag } from "next/cache";

export const deleteRachao = async (id: string) => {
    try {
        await fetch(`${environment.baseURL}/rachao/${id}`, {
            method: 'DELETE'
        })

        revalidateTag('get-all-rachao');

        return 'Rachão deletado com sucesso!';
    } catch (error) {
        console.log(error);
        return 'Erro ao deletar rachão.';
    }
}