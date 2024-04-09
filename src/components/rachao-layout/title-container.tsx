import { twMerge } from "tailwind-merge"

export const TitleContainer = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("flex items-center gap-3 sm:gap-5", className)} {...rest}>{children}</div>
}