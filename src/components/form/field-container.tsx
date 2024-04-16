import { twMerge } from "tailwind-merge"

export const FieldContainer = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("flex flex-col gap-1", className)} {...rest}>{children}</div>
}