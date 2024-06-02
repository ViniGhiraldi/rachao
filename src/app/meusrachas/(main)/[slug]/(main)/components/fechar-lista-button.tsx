'use client'

import { Button } from "@/components/button";
import { useLoadingContext } from "@/contexts/loading-context";
import { putRachao } from "@/services/api/rachas/put-rachao"
import { CornerDownRight } from "lucide-react";
import { toast } from "sonner";

interface IFecharListaButton{
    rachaoId: string;
}

export const FecharListaButton = ({rachaoId}: IFecharListaButton) => {
    const { handleChangeIsLoading } = useLoadingContext();

    const handleOnClick = async () => {
        handleChangeIsLoading(true);
        const result = await putRachao(rachaoId, {status: false});
        if(result === 'As alterações foram salvas!'){
            toast.success('Lista de presença completa!');
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return <Button onClick={handleOnClick} variant="outlined" className="flex items-center gap-2">Fechar lista <CornerDownRight size={28}/></Button>
}