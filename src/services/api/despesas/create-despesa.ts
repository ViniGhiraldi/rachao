import { environment } from "@/environment/environment";
import { IDespesa } from "@/models/despesa";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Pick<IDespesa, 'titulo' | 'quantidade' | 'custoUnitario'>{}

interface IResponse extends Omit<IDespesa, 'createdAt'>{}

export const createDespesa = async (id: string, body: IBody) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/despesas/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const { data } = await response.json() as {data: IResponse};

        if(response.status === 201){
            revalidateTagOnServer('get-all-despesas');
            revalidateTagOnServer('get-rachao');
            return data;
        }

        return 'Erro ao criar despesa. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao criar despesa. Tente novamente mais tarde.';
    }
}