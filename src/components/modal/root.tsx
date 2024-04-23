'use client'

import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface IRoot extends React.ComponentProps<'div'>{
    isOpen: boolean;
    handleOnClose: () => void;
}

export const Root = ({isOpen, handleOnClose, className, children, ...rest}: IRoot) => {
    return (
        <div data-isopen={isOpen} className={twMerge("data-[isopen=false]:sr-only data-[isopen=true]:flex fixed inset-0 z-50 w-screen h-screen bg-black/50 backdrop-blur-md items-center justify-center", className)} {...rest}>
            <button onClick={handleOnClose} className="absolute top-2 right-2 sm:right-6"><X size={28}/></button>
            {children}
        </div>
    )
}