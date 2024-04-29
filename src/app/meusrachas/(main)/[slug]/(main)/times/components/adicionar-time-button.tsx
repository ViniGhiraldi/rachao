'use client'

import { AdicionarTimeModal } from "@/components/adicionar-time-modal/adicionar-time-modal"
import { Button } from "@/components/button"
import { Plus } from "lucide-react"
import { useState } from "react"

interface IAdicionarTimeButton{
    rachaoId: string;
}

export const AdicionarTimeButton = ({rachaoId}: IAdicionarTimeButton) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <Button variant="outlined" icon onClick={() => setIsOpen(true)}><Plus className="text-primary" size={28} /></Button>
            <AdicionarTimeModal rachaoId={rachaoId} isOpen={isOpen} handleOnClose={() => setIsOpen(false)}/>
        </>
    )
}