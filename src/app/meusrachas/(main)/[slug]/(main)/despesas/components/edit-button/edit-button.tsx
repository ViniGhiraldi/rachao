'use client'

import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { Pen } from "lucide-react"
import { useState } from "react"
import { EditForm } from "./edit-form"
import { Divider } from "@/components/divider"
import { IDespesa } from "@/models/despesa"

interface IEditButton{
    despesa: Pick<IDespesa, 'id' | 'titulo' | 'custoUnitario' | 'quantidade'>;
}

export const EditButton = ({despesa}: IEditButton) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button icon variant="outlined" onClick={() => setIsOpen(true)}><Pen size={20}/></Button>
            <Modal.root isOpen={isOpen} handleOnClose={() => setIsOpen(false)}>
                <Modal.content className="text-left sm:w-96">
                    <h1>Editar</h1>
                    <Divider/>
                    <EditForm despesa={despesa} closeForm={() => setIsOpen(false)}/>
                </Modal.content>
            </Modal.root>
        </>
    )
}