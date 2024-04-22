import { twMerge } from "tailwind-merge"

export const ButtonRoot = ({className, children, ...rest}: React.ComponentProps<'button'>) => {
    return <button className={twMerge("border-4 border-primary p-5 rounded-xl font-londrina bg-black/40", className)} {...rest}>{children}</button>
}