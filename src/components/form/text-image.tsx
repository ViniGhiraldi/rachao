import { twMerge } from "tailwind-merge"

export const TextImage = ({className, children, ...rest}: React.ComponentProps<'span'>) => {
    return <span className={twMerge("p-4 text-base font-museo", className)} {...rest}>{children}</span>
}