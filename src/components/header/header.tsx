import Image from "next/image"
import { HeaderNav } from "./header-nav"
import { HeaderMenu } from "./header-menu"

export const Header = () => {
    return(
        <header className="flex justify-between items-center h-20 px-5 md:px-20 w-full">
            <Image src='/logo-default.png' alt='Rachão logo' width={40} height={40} quality={100}/>
            <nav className='hidden md:flex gap-10 font-medium text-lg text-primary/50'>
                <HeaderNav/>
            </nav>
            <HeaderMenu/>
        </header>
    )
}