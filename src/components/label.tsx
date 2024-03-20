import { twMerge } from "tailwind-merge"

export const Label = ({className, children, ...rest}: React.ComponentProps<'label'>) => {
    return <label className={twMerge("font-semibold text-primary text-lg", className)} {...rest}>{children}</label>
}