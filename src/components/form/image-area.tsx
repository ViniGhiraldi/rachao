import { twMerge } from "tailwind-merge"

export const ImageArea = ({className, children, ...rest}: React.ComponentProps<'label'>) => {
    return <label className={twMerge("size-40 border-4 border-dashed cursor-pointer border-primary rounded-lg overflow-hidden flex items-center justify-center text-muted text-center self-center", className)} {...rest}>{children}</label>
}