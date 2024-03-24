import { twMerge } from "tailwind-merge"

export const Header = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return (
        <div className={twMerge("flex justify-between items-end font-londrina", className)} {...rest}>
            {children}
        </div>
    )
}