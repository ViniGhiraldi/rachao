import { twMerge } from "tailwind-merge"

export const Title = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("font-semibold text-sm text-left whitespace-nowrap", className)} {...rest}>{children}</p>
}