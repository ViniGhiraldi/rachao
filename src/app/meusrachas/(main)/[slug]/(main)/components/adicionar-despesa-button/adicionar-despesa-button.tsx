'use client'

import { Card } from "@/components/card"
import { Divider } from "@/components/divider"
import { Modal } from "@/components/modal"
import { CircleDollarSign } from "lucide-react"
import { useState } from "react"
import { Form } from "./form"

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
            <Modal.root isOpen={isOpen} handleOnClose={() => setIsOpen(false)}>
                <Modal.content className="text-left sm:w-96">
                    <h1>Adicionar despesa</h1>
                    <Divider/>
                    <Form rachaoId={rachaoId} closeForm={() => setIsOpen(false)}/>
                </Modal.content>
            </Modal.root>
        </>
    )
}