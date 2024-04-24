'use client'

import { Button } from "@/components/button"
import { deleteDespesa } from "@/services/api/despesas/delete-despesa"
import { X } from "lucide-react"
import { toast } from "sonner";

interface IDeleteButton{
    despesaId: string;
}

export const DeleteButton = ({despesaId}: IDeleteButton) => {
    const handleOnDelete = async () => {
        const result = await deleteDespesa(despesaId);
        if(!result){
            toast.success('Despesa deletada!');
        }else{
            toast.error(result);
        }
    }

    return <Button icon variant="outlined" onClick={handleOnDelete}><X size={20}/></Button>
}