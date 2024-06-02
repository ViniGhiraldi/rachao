'use client'

import { useLoadingContext } from "@/contexts/loading-context";
import { putJogador } from "@/services/api/jogadores/put-jogador"
import { toast } from "sonner"

interface IConfirmarButton{
    jogadorId: string;
}

export const ConfirmarButton = ({jogadorId}: IConfirmarButton) => {
    const { isLoading } = useLoadingContext();

    const handleOnClick = async () => {
        const result = await putJogador(jogadorId, {presenca: true});
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
    }

    return <button disabled={isLoading} className="text-primary text-xl px-2 hover:underline disabled:opacity-50" onClick={handleOnClick}>Confirmar</button>
}