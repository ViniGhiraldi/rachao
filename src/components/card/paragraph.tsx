import { twMerge } from "tailwind-merge"

export const Paragraph = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("font-light text-xl sm:text-2xl text-white", className)} {...rest}>{children}</p>
}