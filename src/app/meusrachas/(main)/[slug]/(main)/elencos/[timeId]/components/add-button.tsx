'use client'

import { putJogador } from "@/services/api/jogadores/put-jogador"
import { Plus } from "lucide-react"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface IAddButton extends React.ComponentProps<'button'>{
    jogadorId: string;
    timeId: string;
}

export const AddButton = ({jogadorId, timeId, className, children = 'Add', ...rest}: IAddButton) => {
    const handleAdd = async () => {
        const result = await putJogador(jogadorId, {timeId});
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
    }

    return <button className={twMerge("flex items-center gap-2", className)} onClick={handleAdd} {...rest}><Plus size={24} className="text-primary"/> {children}</button>
}