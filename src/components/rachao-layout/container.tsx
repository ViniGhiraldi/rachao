import { twMerge } from "tailwind-merge"

export const Container = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("space-y-3 md:space-y-4", className)} {...rest}>{children}</div>
}