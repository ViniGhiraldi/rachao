'use client'

import { Card } from "@/components/card"
import { Modal } from "@/components/modal"
import { Shield } from "lucide-react"
import { useState } from "react"
import { Form } from "./form"
import { Divider } from "@/components/divider"

interface IAdicionarTimeButton{
    rachaoId: string;
}

export const AdicionarTimeButton = ({rachaoId}: IAdicionarTimeButton) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card.buttonRoot className="flex flex-col items-center justify-center h-60" onClick={() => setIsOpen(true)}>
                <Shield size={48} className="text-white" />
                <Card.paragraph>Adicionar time</Card.paragraph>
            </Card.buttonRoot>
            <Modal.root isOpen={isOpen} handleOnClose={() => setIsOpen(false)}>
                <Modal.content className="text-left sm:w-96">
                    <h1>Adicionar time</h1>
                    <Divider/>
                    <Form rachaoId={rachaoId} closeForm={() => setIsOpen(false)}/>
                </Modal.content>
            </Modal.root>
        </>
    )
}