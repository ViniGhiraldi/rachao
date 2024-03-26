import { twMerge } from "tailwind-merge"

export const Label = ({className, children, ...rest}: React.ComponentProps<'label'>) => {
    return <label className={twMerge("font-semibold font-museo text-primary text-base sm:text-lg", className)} {...rest}>{children}</label>
}