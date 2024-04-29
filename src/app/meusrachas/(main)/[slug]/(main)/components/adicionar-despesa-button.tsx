'use client'

import { AdicionarDespesaModal } from "@/components/adicionar-despesa-modal/adicionar-despesa-modal"
import { Card } from "@/components/card"
import { CircleDollarSign } from "lucide-react"
import { useState } from "react"

interface IAdicionarDespesaButton{
    rachaoId: string;
}

export const AdicionarDespesaButton = ({rachaoId}: IAdicionarDespesaButton) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <Card.buttonRoot className="flex flex-col items-center justify-center h-60" onClick={() => setIsOpen(true)}>
                <CircleDollarSign size={48} className="text-white" />
                <Card.paragraph>Adicionar despesa</Card.paragraph>
            </Card.buttonRoot>
            <AdicionarDespesaModal rachaoId={rachaoId} isOpen={isOpen} handleOnClose={() => setIsOpen(false)}/>
        </>
    )
}