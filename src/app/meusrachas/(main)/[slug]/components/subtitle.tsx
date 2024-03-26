import { twMerge } from "tailwind-merge"

export const Subtitle = ({className, children, ...rest}: React.ComponentProps<'p'>) => {
    return <p className={twMerge("font-thin text-muted text-lg leading-5", className)} {...rest}>{children}</p>
}