'use client'

import { Button } from "@/components/button"
import { deleteResultado } from "@/services/api/resultados/delete-resultado";
import { X } from "lucide-react"
import { toast } from "sonner";

interface IDeleteButton{
    resultadoId: string;
}

export const DeleteButton = ({resultadoId}: IDeleteButton) => {

    const handleOnDelete = async () => {
        const result = await deleteResultado(resultadoId);
        if(!result){
            toast.success('Resultado deletado!');
        }else{
            toast.error(result);
        }
    }

    return <Button icon variant="outlined" onClick={handleOnDelete} className="w-fit"><X size={20}/></Button>
}