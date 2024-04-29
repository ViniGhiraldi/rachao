'use client'

import { Card } from "@/components/card"
import { Shield } from "lucide-react"
import { useState } from "react"
import { AdicionarTimeModal } from "@/components/adicionar-time-modal/adicionar-time-modal"

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
            <AdicionarTimeModal rachaoId={rachaoId} isOpen={isOpen} handleOnClose={() => setIsOpen(false)}/>
        </>
    )
}