'use client'

import { twMerge } from "tailwind-merge"

interface IRoot extends React.ComponentProps<'div'>{
    isOpen: boolean;
}

export const Root = ({isOpen, className, children, ...rest}: IRoot) => {
    return <div data-isopen={isOpen} className={twMerge("hidden data-[isopen=true]:flex flex-col w-40 bg-white shadow rounded-md px-4 py-3 gap-3 font-museo absolute top-12 border", className)} {...rest}>{children}</div>
}