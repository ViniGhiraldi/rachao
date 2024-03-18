'use client'

import { Menu } from "lucide-react"
import { Modal } from "../modal"
import { useState } from "react"
import { HeaderNav } from "./header-nav"

export const HeaderMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick = () => {
        setIsOpen(current => !current);
    }

    return(
        <>
            <button className="block md:hidden" onClick={handleOnClick}><Menu size={28}/></button>
            <Modal.root isOpen={isOpen} handleOnClose={handleOnClick}>
                <div className="flex flex-col text-center text-3xl gap-3">
                    <HeaderNav/>
                </div>
            </Modal.root>
        </>
    )
}