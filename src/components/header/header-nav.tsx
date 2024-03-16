'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export const HeaderNav = () => {
    const pathname = usePathname()

    const pathCompare = (href: string) => {
        return pathname === href
    }

    return (
        <nav className={`flex gap-10 font-medium text-lg text-lime-400/50`}>
            <Link href='/' data-url={pathCompare('/')} className="data-[url=true]:text-lime-400">Inicio</Link>
            <Link href='/meusrachas' data-url={pathCompare('/meusrachas')} className="data-[url=true]:text-lime-400">Meus rachas</Link>
            <Link href='/sobre' data-url={pathCompare('/sobre')} className="data-[url=true]:text-lime-400">Sobre</Link>
            <Link href='/contato' data-url={pathCompare('/contato')} className="data-[url=true]:text-lime-400">Contato</Link>
        </nav>
    )
}