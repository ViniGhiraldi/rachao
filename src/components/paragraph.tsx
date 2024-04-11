import { twMerge } from "tailwind-merge"

export const Paragraph = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("text-3xl font-normal font-londrina", className)} {...rest}>{children}</p>
}