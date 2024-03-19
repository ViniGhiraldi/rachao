import { twMerge } from "tailwind-merge"

export const Input = ({className, ...rest}: React.ComponentProps<'input'>) => {
    return <input className={twMerge("border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg", className)} {...rest} />
}