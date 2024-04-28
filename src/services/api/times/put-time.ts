import { environment } from "@/environment/environment";
import { ITime } from "@/models/time";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Partial<Pick<ITime, 'nome'>>{
    imagem?: File | null;
}

interface IDeleteOptions{
    deleteImagem?: boolean;
}

export const putTime = async (id: string, body: IBody, options?: IDeleteOptions) => {
    const form = new FormData();
    if(body.nome) form.append('nome', body.nome);
    if(body.imagem) form.append('imagem', body.imagem);

    try {
        const response = await fetch(`${environment.APIbaseURL}/times/${id}?deleteImagem=${!!options?.deleteImagem}`, {
            method: 'PUT',
            body: form
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-times');
            return `As alterações foram salvas!`
        }

        return 'Erro ao alterar o time. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao alterar o time. Tente novamente mais tarde.';
    }
}