import { twMerge } from "tailwind-merge"

export const Header = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return (
        <div className={twMerge("flex justify-between items-end gap-12 font-londrina", className)} {...rest}>
            {children}
        </div>
    )
}