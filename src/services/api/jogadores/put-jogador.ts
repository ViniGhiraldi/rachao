import { environment } from "@/environment/environment";
import { IJogador } from "@/models/jogador";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Partial<Pick<IJogador, 'nome' | 'presenca' | 'nota'>>{
    imagem?: File | null;
    timeId?: string;
}

interface IDeleteOptions{
    deleteImagem?: boolean;
    deleteTime?: boolean;
}

export const putJogador = async (id: string, body: IBody, options?: IDeleteOptions) => {
    const form = new FormData();
    if(body.nome) form.append('nome', body.nome);
    if(body.imagem) form.append('imagem', body.imagem);
    if(body.presenca !== undefined) form.append('presenca', String(body.presenca));
    if(body.nota !== undefined) form.append('nota', String(body.nota));
    if(body.timeId) form.append('timeId', String(body.timeId));

    try {
        const response = await fetch(`${environment.APIbaseURL}/jogadores/${id}?deleteImagem=${!!options?.deleteImagem}&deleteTime=${!!options?.deleteTime}`, {
            method: 'PUT',
            body: form
        })

        if(response.status === 200){
            revalidateTagOnServer('get-all-jogadores');
            return `As alterações foram salvas!`
        }

        return 'Erro ao alterar o jogador. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao alterar o jogador. Tente novamente mais tarde.';
    }
}