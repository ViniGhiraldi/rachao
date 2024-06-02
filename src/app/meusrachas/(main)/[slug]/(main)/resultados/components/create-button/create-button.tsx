'use client'

import { Modal } from "@/components/modal"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Divider } from "@/components/divider"
import { Card } from "@/components/card"
import { CreateForm } from "./create-form"
import { ITime } from "@/models/time"

interface ITimeForForm extends Pick<ITime, 'id' | 'nome' | 'imagem'>{}

interface ICreateButton{
    times: ITimeForForm[];
    rachaoId: string;
}

export const CreateButton = ({times, rachaoId}: ICreateButton) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card.buttonRoot className="flex justify-between items-center" onClick={() => setIsOpen(true)}>
                <Plus size={48} className="text-white"/>
                <div className="text-right">
                    <Card.paragraph>Adicionar resultado</Card.paragraph>
                </div>
            </Card.buttonRoot>
            <Modal.root isOpen={isOpen} handleOnClose={() => setIsOpen(false)}>
                <Modal.content className="text-left sm:w-96">
                    <h1>Adicionar resultado</h1>
                    <Divider/>
                    <CreateForm times={times} rachaoId={rachaoId} closeForm={() => setIsOpen(false)}/>
                </Modal.content>
            </Modal.root>
        </>
    )
}