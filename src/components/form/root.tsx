import { twMerge } from "tailwind-merge"

export const Root = ({className, children, ...rest}: React.ComponentProps<'form'>) => {
    return <form className={twMerge("space-y-3 w-full", className)} {...rest}>{children}</form>
}