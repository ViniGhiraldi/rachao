import { twMerge } from "tailwind-merge"

export const Paragraph = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("font-thin text-sm text-left whitespace-nowrap", className)} {...rest}>{children}</p>
}