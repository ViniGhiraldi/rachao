'use client'

import { Button } from "@/components/button";
import { IRachao } from "@/models/rachao";
import { putRachao } from "@/services/api/rachas/put-rachao"
import { CornerDownRight } from "lucide-react";
import { toast } from "sonner";

interface IFecharListaButton{
    rachao: Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local'>;
}

export const FecharListaButton = ({rachao}: IFecharListaButton) => {
    const handleOnClick = async () => {
        const result = await putRachao(rachao.id, {...rachao, status: false});
        if(result === 'As alterações foram salvas!'){
            toast.success('Lista de presença completa!');
        }else{
            toast.error(result);
        }
    }

    return <Button onClick={handleOnClick} variant="outlined" className="flex items-center gap-3">Fechar lista <CornerDownRight size={28}/></Button>
}