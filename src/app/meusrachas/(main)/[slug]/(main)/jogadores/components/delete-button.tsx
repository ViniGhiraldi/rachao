'use client'

import { Button } from "@/components/button"
import { deleteJogador } from "@/services/api/jogadores/delete-jogador";
import { X } from "lucide-react";
import { toast } from "sonner";

interface IDeleteButton{
    jogadorId: string
}

export const DeleteButton = ({jogadorId}: IDeleteButton) => {
    const handleOnDelete = async () => {
        const result = await deleteJogador(jogadorId);
        if(!result){
            toast.success('Jogador deletado!');
        }else{
            toast.error(result);
        }
    }

    return <Button icon variant="outlined" onClick={handleOnDelete}><X size={20}/></Button>
}