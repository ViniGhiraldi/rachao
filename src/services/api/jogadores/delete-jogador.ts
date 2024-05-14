import { environment } from "@/environment/environment";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

export const deleteJogador = async (id: string) => {    
    try {
        const response = await fetch(`${environment.APIbaseURL}/jogadores/${id}`, {
            method: 'DELETE',
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-jogadores');
            revalidateTagOnServer('get-all-times');
            revalidateTagOnServer('get-rachao');
            revalidateTagOnServer('get-time');
            return;
        }

        return 'Erro ao excluir jogador. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao excluir jogador. Tente novamente mais tarde.';
    }
}