import { twMerge } from "tailwind-merge"

export const Paragraph = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("font-thin font-museo text-sm whitespace-nowrap", className)} {...rest}>{children}</p>
}