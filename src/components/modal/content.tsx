import { twMerge } from "tailwind-merge";

export const Content = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("w-96 bg-background rounded-lg p-7", className)} {...rest}>{children}</div>
}