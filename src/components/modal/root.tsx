import { twMerge } from "tailwind-merge";

interface IRoot extends React.ComponentProps<'div'>{
    isOpen: boolean;
}

export const Root = ({isOpen, className, children, ...rest}: IRoot) => {
    return <div data-isopen={isOpen} className={twMerge("data-[isopen=false]:hidden data-[isopen=true]:flex fixed w-screen h-screen bg-black/50 items-center justify-center", className)} {...rest}>{children}</div>
}