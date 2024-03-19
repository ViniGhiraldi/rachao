import { twMerge } from "tailwind-merge"

export const Label = ({className, children, ...rest}: React.ComponentProps<'label'>) => {
    return <label className={twMerge("font-semibold text-primary text-xl", className)} {...rest}>{children}</label>
}