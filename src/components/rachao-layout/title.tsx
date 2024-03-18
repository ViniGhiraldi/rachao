import { twMerge } from "tailwind-merge"

export const Title = ({className, children, ...rest}: React.ComponentProps<'h1'>) => {
    return <h1 className={twMerge("text-3xl sm:text-5xl font-medium", className)} {...rest}>{children}</h1>
}