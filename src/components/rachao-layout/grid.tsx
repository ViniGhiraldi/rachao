import { twMerge } from "tailwind-merge"

export const Grid = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-7", className)} {...rest}>{children}</div>
}