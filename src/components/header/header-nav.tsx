'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export const HeaderNav = () => {
    const pathname = usePathname()

    const pathCompare = (href: string) => {
        return href === '/' ? href === pathname : pathname.includes(href)
    }

    return (
        <>
            <Link href='/' data-url={pathCompare('/')} className="data-[url=true]:text-primary">Inicio</Link>
            <Link href='/meusrachas' data-url={pathCompare('/meusrachas')} className="data-[url=true]:text-primary">Meus rachas</Link>
            <Link href='/sobre' data-url={pathCompare('/sobre')} className="data-[url=true]:text-primary">Sobre</Link>
            <Link href='/contato' data-url={pathCompare('/contato')} className="data-[url=true]:text-primary">Contato</Link>
        </>
    )
}