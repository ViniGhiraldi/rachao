import { twMerge } from "tailwind-merge"

export const ErrorParagraph = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("text-sm font-londrina text-danger font-thin", className)} {...rest}>{children}</p>
}