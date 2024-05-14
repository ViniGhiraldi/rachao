'use client'

import { Button } from "@/components/button";
import { putJogador } from "@/services/api/jogadores/put-jogador";
import { X } from "lucide-react";
import { toast } from "sonner";

interface IDeleteButton{
    jogadorId: string;
}

export const DeleteButton = ({jogadorId}: IDeleteButton) => {
    const handleDelete = async () => {
        const result = await putJogador(jogadorId, {}, {deleteTime: true});
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
    }

    return <Button icon variant="outlined" onClick={handleDelete} className="w-fit"><X size={20}/></Button>
}