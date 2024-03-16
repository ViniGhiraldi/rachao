import { twMerge } from "tailwind-merge"

export const Title = ({className, children, ...rest}: React.ComponentProps<'h1'>) => {
    return <h1 className={twMerge("text-3xl font-medium text-center text-lime-400", className)} {...rest}>{children}</h1>
}