'use client'

import { AdicionarDespesaModal } from "@/components/adicionar-despesa-modal/adicionar-despesa-modal"
import { Button } from "@/components/button"
import { Plus } from "lucide-react"
import { useState } from "react"

interface IAdicionarDespesaButton{
    rachaoId: string;
}

export const AdicionarDespesaButton = ({rachaoId}: IAdicionarDespesaButton) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <Button variant="outlined" icon onClick={() => setIsOpen(true)}><Plus className="text-primary" size={28} /></Button>
            <AdicionarDespesaModal rachaoId={rachaoId} isOpen={isOpen} handleOnClose={() => setIsOpen(false)}/>
        </>
    )
}