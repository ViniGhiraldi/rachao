import { environment } from "@/environment/environment";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

export const deleteDespesa = async (despesaId: string) => {    
    try {
        const response = await fetch(`${environment.APIbaseURL}/despesas/${despesaId}`, {
            method: 'DELETE',
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-despesas');
            revalidateTagOnServer('get-rachao');
            return;
        }

        return 'Erro ao excluir despesa. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao excluir despesa. Tente novamente mais tarde.';
    }
}