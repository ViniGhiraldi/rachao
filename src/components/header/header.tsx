import Image from "next/image"
import { HeaderNav } from "./header-nav"

export const Header = () => {
    return(
        <header className="flex justify-between items-center h-20 px-20 absolute w-full">
            <Image src='/logo-default.png' alt='Rachão logo' width={100} height={100} />
            <HeaderNav/>
        </header>
    )
}