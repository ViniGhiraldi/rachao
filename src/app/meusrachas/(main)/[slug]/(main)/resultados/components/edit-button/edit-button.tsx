'use client'

import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { Pen } from "lucide-react"
import { useState } from "react"
import { Divider } from "@/components/divider"
import { EditForm } from "./edit-form"
import { ITime } from "@/models/time"
import { IResultado } from "@/models/resultado"

interface ITimeForResultado extends Pick<ITime, 'id'>{}

interface IResultadoForForm extends Pick<IResultado, 'id' | 'timeCasaPontos' | 'timeVisitantePontos'>{
    timeCasa: ITimeForResultado;
    timeVisitante: ITimeForResultado;
}

interface ITimeForForm extends Pick<ITime, 'id' | 'nome'>{}

interface IEditButton{
    resultado: IResultadoForForm;
    times: ITimeForForm[];
}

export const EditButton = ({resultado, times}: IEditButton) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button icon variant="outlined" onClick={() => setIsOpen(true)}><Pen size={20}/></Button>
            <Modal.root isOpen={isOpen} handleOnClose={() => setIsOpen(false)}>
                <Modal.content className="text-left sm:w-96">
                    <h1>Editar</h1>
                    <Divider/>
                    <EditForm resultado={resultado} times={times} closeForm={() => setIsOpen(false)}/>
                </Modal.content>
            </Modal.root>
        </>
    )
}