'use client'

import { Button } from "@/components/button"
import { deleteTime } from "@/services/api/times/delete-time";
import { X } from "lucide-react";
import { toast } from "sonner";

interface IDeleteButton{
    timeId: string
}

export const DeleteButton = ({timeId}: IDeleteButton) => {
    const handleOnDelete = async () => {
        const result = await deleteTime(timeId);
        if(!result){
            toast.success('Time deletado!');
        }else{
            toast.error(result);
        }
    }

    return <Button icon variant="outlined" onClick={handleOnDelete}><X size={20}/></Button>
}