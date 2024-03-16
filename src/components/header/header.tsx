import Image from "next/image"
import { HeaderNav } from "./header-nav"

export const Header = () => {
    return(
        <header className="flex justify-between items-center h-20 px-20 w-full">
            <Image src='/logo-default.png' alt='Rachão logo' width={40} height={40} quality={100}/>
            <HeaderNav/>
        </header>
    )
}