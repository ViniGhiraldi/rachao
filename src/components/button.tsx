import { twMerge } from "tailwind-merge"

export const Button = ({className, children, ...rest}: React.ComponentProps<'button'>) => {
    return <button className={twMerge("py-2 px-4 rounded-lg bg-primary hover:ring-1 hover:ring-black font-londrina text-xl font-light", className)} {...rest}>{children}</button>
}