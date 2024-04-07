import { environment } from "@/environment/environment";
import { IJogador } from "@/models/jogador";
import { revalidateTagOnServer } from "@/utils/revalidate-tag-on-server";

interface IBody extends Pick<IJogador, 'nome' | 'presenca'>{
    imagem: File | null;
}

interface IResponse extends Pick<IJogador, 'nome'>{}

export const createJogador = async (id: string, body: IBody) => {
    const form = new FormData();
    form.append('nome', body.nome);
    form.append('presenca', String(body.presenca));
    if(body.imagem) form.append('imagem', body.imagem);
    
    try {
        const response = await fetch(`${environment.APIbaseURL}/jogadores/${id}`, {
            method: 'POST',
            body: form
        })

        const { data } = await response.json() as {data: IResponse};

        if(response.status === 201){
            revalidateTagOnServer('get-rachao')
            return data;
        }

        return 'Erro ao criar jogador. Tente novamente mais tarde.';
    } catch (error) {
        console.log(error);
        return 'Erro ao criar jogador. Tente novamente mais tarde.';
    }
}