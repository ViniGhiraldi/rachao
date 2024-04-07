import { twMerge } from "tailwind-merge"

export const Message = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("text-xl", className)} {...rest}>{children}</p>
}