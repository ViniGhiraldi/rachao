'use client'

import { Button } from "@/components/button";
import { putRachao } from "@/services/api/rachas/put-rachao"
import { CornerDownLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IReabrirListaButton{
    rachaoId: string;
}

export const ReabrirListaButton = ({rachaoId}: IReabrirListaButton) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async () => {
        setIsLoading(true);
        const result = await putRachao(rachaoId, {status: true});
        if(result === 'As alterações foram salvas!'){
            toast.info('Lista de presença reaberta!');
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return <Button onClick={handleOnClick} variant="outlined" disabled={isLoading} className="flex items-center gap-3 font-museo tracking-tight"><CornerDownLeft size={28}/> Reabrir lista</Button>
}