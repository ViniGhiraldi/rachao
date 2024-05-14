'use client'

import { putJogador } from "@/services/api/jogadores/put-jogador"
import { toast } from "sonner"

interface IConfirmarButton{
    jogadorId: string;
}

export const ConfirmarButton = ({jogadorId}: IConfirmarButton) => {
    const handleOnClick = async () => {
        const result = await putJogador(jogadorId, {presenca: true});
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
    }

    return <button className="text-primary text-xl px-2 hover:underline" onClick={handleOnClick}>Confirmar</button>
}