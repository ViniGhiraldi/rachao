import { twMerge } from "tailwind-merge"

export const ButtonsContainer = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("self-start flex gap-3", className)} {...rest}>{children}</div>
}