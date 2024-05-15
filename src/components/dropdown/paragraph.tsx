import { twMerge } from "tailwind-merge"

export const Paragraph = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("font-thin text-sm text-left whitespace-nowrap hover:underline", className)} {...rest}>{children}</p>
}