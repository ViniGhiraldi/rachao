'use client'

import { Button } from "@/components/button";
import { useLoadingContext } from "@/contexts/loading-context";
import { putRachao } from "@/services/api/rachas/put-rachao"
import { CornerDownLeft } from "lucide-react";
import { toast } from "sonner";

interface IReabrirListaButton{
    rachaoId: string;
}

export const ReabrirListaButton = ({rachaoId}: IReabrirListaButton) => {
    const { handleChangeIsLoading } = useLoadingContext();

    const handleOnClick = async () => {
        handleChangeIsLoading(true);
        const result = await putRachao(rachaoId, {status: true});
        if(result === 'As alterações foram salvas!'){
            toast.info('Lista de presença reaberta!');
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return <Button onClick={handleOnClick} variant="outlined" className="flex items-center gap-2"><CornerDownLeft size={28}/> Reabrir lista</Button>
}