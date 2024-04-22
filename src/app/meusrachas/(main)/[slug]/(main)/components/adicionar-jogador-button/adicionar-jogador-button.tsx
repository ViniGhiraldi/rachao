'use client'

import { Card } from "@/components/card"
import { Modal } from "@/components/modal"
import { UserRound } from "lucide-react"
import { useState } from "react"
import { Form } from "./form"

interface IAdicionarJogadorButton{
    rachaoId: string;
}

export const AdicionarJogadorButton = ({rachaoId}: IAdicionarJogadorButton) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card.buttonRoot className="flex flex-col items-center justify-center h-60" onClick={() => setIsOpen(true)}>
                <UserRound size={48} className="text-white" />
                <Card.paragraph>Adicionar jogadores</Card.paragraph>
            </Card.buttonRoot>
            <Modal.root isOpen={isOpen} handleOnClose={() => setIsOpen(false)}>
                <Modal.content className="text-left sm:w-96">
                    <h1>Adicionar jogador</h1>
                    <Form rachaoId={rachaoId} closeForm={() => setIsOpen(false)}/>
                </Modal.content>
            </Modal.root>
        </>
    )
}