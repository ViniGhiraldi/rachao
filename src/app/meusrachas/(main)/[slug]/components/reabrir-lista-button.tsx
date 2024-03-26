'use client'

import { Button } from "@/components/button";
import { IRachao } from "@/models/rachao";
import { putRachao } from "@/services/api/rachas/put-rachao"
import { CornerDownLeft } from "lucide-react";
import { toast } from "sonner";

interface IReabrirListaButton{
    rachao: Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local'>;
}

export const ReabrirListaButton = ({rachao}: IReabrirListaButton) => {
    const handleOnClick = async () => {
        const result = await putRachao(rachao.id, {...rachao, status: true});
        if(result === 'As alterações foram salvas!'){
            toast.success('Lista de presença reaberta!');
        }else{
            toast.error(result);
        }
    }

    return <Button onClick={handleOnClick} variant="outlined" className="flex items-center gap-3"><CornerDownLeft size={28}/> Reabrir lista</Button>
}