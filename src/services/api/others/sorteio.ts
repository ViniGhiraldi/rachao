import { environment } from "@/environment/environment";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

export const sorteio = async (id: string, apenasJogadoresSemTime = false, apenasJogadoresConfirmados = false) => {    
    try {
        const response = await fetch(`${environment.APIbaseURL}/sorteio/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({apenasJogadoresSemTime, apenasJogadoresConfirmados})
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-jogadores');
            revalidateTagOnServer('get-all-times');
            revalidateTagOnServer('get-time');
            return;
        }

        return 'Erro inesperado ao realizar o sorteio.';
    } catch (error) {
        console.log(error);
        return 'Erro inesperado ao realizar o sorteio.';
    }
}