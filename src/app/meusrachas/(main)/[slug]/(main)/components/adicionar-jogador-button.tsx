'use client'

import { Card } from "@/components/card"
import { UserRound } from "lucide-react"
import { useState } from "react"
import { AdicionarJogadorModal } from "@/components/adicionar-jogador-modal/adicionar-jogador-modal"

interface IAdicionarJogadorButton{
    rachaoId: string;
}

export const AdicionarJogadorButton = ({rachaoId}: IAdicionarJogadorButton) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card.buttonRoot className="flex flex-col items-center justify-center h-60" onClick={() => setIsOpen(true)}>
                <UserRound size={48} className="text-white" />
                <Card.paragraph>Adicionar jogador</Card.paragraph>
            </Card.buttonRoot>
            <AdicionarJogadorModal rachaoId={rachaoId} isOpen={isOpen} handleOnClose={() => setIsOpen(false)}/>
        </>
    )
}