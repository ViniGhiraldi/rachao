'use client'

import { twMerge } from "tailwind-merge"

interface IRoot extends React.ComponentProps<'div'>{
    isOpen: boolean;
}

export const Root = ({isOpen, className, children, ...rest}: IRoot) => {
    return <div data-isopen={isOpen} className={twMerge("hidden data-[isopen=true]:block max-w-36 bg-white rounded-lg px-4 py-2 text-center absolute top-7 border", className)} {...rest}>{children}</div>
}