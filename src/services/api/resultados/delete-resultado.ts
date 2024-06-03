import { environment } from "@/environment/environment";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

export const deleteResultado = async (resultadoId: string) => {    
    try {
        const response = await fetch(`${environment.APIbaseURL}/resultados/${resultadoId}`, {
            method: 'DELETE',
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-resultados');
            revalidateTagOnServer('get-all-times');
            return;
        }

        return 'Erro ao excluir resultado. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao excluir resultado. Tente novamente mais tarde.';
    }
}