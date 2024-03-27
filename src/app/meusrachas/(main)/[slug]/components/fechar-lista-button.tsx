'use client'

import { Button } from "@/components/button";
import { putRachao } from "@/services/api/rachas/put-rachao"
import { CornerDownRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IFecharListaButton{
    rachaoId: string;
}

export const FecharListaButton = ({rachaoId}: IFecharListaButton) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async () => {
        setIsLoading(true);
        const result = await putRachao(rachaoId, {status: false});
        if(result === 'As alterações foram salvas!'){
            toast.success('Lista de presença completa!');
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return <Button onClick={handleOnClick} variant="outlined" disabled={isLoading} className="flex items-center gap-3">Fechar lista <CornerDownRight size={28}/></Button>
}