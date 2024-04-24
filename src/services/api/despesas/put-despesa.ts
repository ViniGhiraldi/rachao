import { environment } from "@/environment/environment";
import { IDespesa } from "@/models/despesa";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Pick<IDespesa, 'titulo' | 'quantidade' | 'custoUnitario'>{}

export const putDespesa = async (despesaId: string, body: IBody) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/despesas/${despesaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-despesas');
            revalidateTagOnServer('get-rachao');
            return `As alterações foram salvas!`
        }

        return 'Erro ao alterar despesa. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao alterar despesa. Tente novamente mais tarde.';
    }
}