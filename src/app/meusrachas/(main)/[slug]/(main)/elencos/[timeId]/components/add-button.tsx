'use client'

import { Button } from "@/components/button";
import { putJogador } from "@/services/api/jogadores/put-jogador"
import { UserRoundPlus } from "lucide-react"
import { toast } from "sonner";

interface IAddButton extends React.ComponentProps<'button'>{
    jogadorId: string;
    timeId: string;
}

export const AddButton = ({jogadorId, timeId, ...rest}: IAddButton) => {
    const handleAdd = async () => {
        const result = await putJogador(jogadorId, {timeId});
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
    }

    return <Button variant="outlined" icon onClick={handleAdd} {...rest}><UserRoundPlus size={24} className="text-primary"/></Button>
}