import { environment } from "@/environment/environment";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

export const deleteTime = async (id: string) => {    
    try {
        const response = await fetch(`${environment.APIbaseURL}/times/${id}`, {
            method: 'DELETE',
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-times');
            revalidateTagOnServer('get-rachao');
            return;
        }

        return 'Erro ao excluir time. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao excluir time. Tente novamente mais tarde.';
    }
}