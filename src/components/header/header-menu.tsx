'use client'

import { Menu } from "lucide-react"
import { Modal } from "../modal"
import { useState } from "react"

export const HeaderMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick = () => {
        setIsOpen(current => !current);
    }

    return(
        <>
            <Modal.root isOpen={isOpen}></Modal.root>
            <button className="block md:hidden" onClick={handleOnClick}><Menu size={28}/></button>
        </>
    )
}