import { twMerge } from "tailwind-merge"

export const Content = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("mt-7 text-xl font-light text-white", className)} {...rest}>{children}</div>
}