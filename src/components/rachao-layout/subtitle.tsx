import { twMerge } from "tailwind-merge"

export const Subtitle = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("font-thin text-muted text-lg", className)} {...rest}>{children}</p>
}