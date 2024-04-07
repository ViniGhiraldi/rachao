import { environment } from "@/environment/environment"
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

export const deleteRachao = async (id: string) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/rachao/${id}`, {
            method: 'DELETE'
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-rachao');
            return 'Rachão deletado com sucesso!';
        }
        
        return 'Erro ao deletar rachão.';
    } catch (error) {
        console.log(error);
        return 'Erro ao deletar rachão.';
    }
}