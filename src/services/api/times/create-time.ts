import { environment } from "@/environment/environment";
import { ITime } from "@/models/time";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Pick<ITime, 'nome'>{
    imagem: File | null;
}

interface IResponse extends Pick<ITime, 'nome'>{}

export const createTime = async (id: string, body: IBody) => {
    const form = new FormData();
    form.append('nome', body.nome);
    if(body.imagem) form.append('imagem', body.imagem);
    
    try {
        const response = await fetch(`${environment.APIbaseURL}/times/${id}`, {
            method: 'POST',
            body: form
        })

        const { data } = await response.json() as {data: IResponse};

        if(response.status === 201){
            /* revalidateTagOnServer('get-all-jogadores'); */
            revalidateTagOnServer('get-rachao');
            return data;
        }

        return 'Erro ao criar time. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao criar time. Tente novamente mais tarde.';
    }
}