'use client'

import { AdicionarJogadorModal } from "@/components/adicionar-jogador-modal/adicionar-jogador-modal"
import { Button } from "@/components/button"
import { Plus } from "lucide-react"
import { useState } from "react"

interface IAdicionarJogadorButton{
    rachaoId: string;
}

export const AdicionarJogadorButton = ({rachaoId}: IAdicionarJogadorButton) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <Button variant="outlined" icon onClick={() => setIsOpen(true)}><Plus className="text-primary" size={28} /></Button>
            <AdicionarJogadorModal rachaoId={rachaoId} isOpen={isOpen} handleOnClose={() => setIsOpen(false)}/>
        </>
    )
}