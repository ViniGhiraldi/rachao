import { twMerge } from "tailwind-merge"

export const Button = ({className, children, ...rest}: React.ComponentProps<'button'>) => {
    return <button className={twMerge("py-2 px-4 rounded-lg bg-primary font-londrina text-lg font-light", className)} {...rest}>{children}</button>
}