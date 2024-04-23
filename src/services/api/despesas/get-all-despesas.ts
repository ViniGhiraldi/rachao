import { environment } from "@/environment/environment";
import { IDespesa } from "@/models/despesa";

export const getAllDespesas = async (id: string) => {
    try {
        const response = await fetch(`${environment.APIbaseURL}/despesas/all/${id}`, {
            method: 'GET',
            next: {
                tags: ['get-all-despesas'],
            }
        })

        const { data } = await response.json() as {data: Omit<IDespesa, 'createdAt'>[]};

        if(response.status === 200 && data.length) return data;

        return 'Não há despesas até o momento.';
    } catch (error) {
        console.log(error);
        return 'Rachão não encontrado ou existente!';
    }
}