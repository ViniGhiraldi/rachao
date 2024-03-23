import { twMerge } from "tailwind-merge";

export const Content = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("w-full sm:w-96 bg-background sm:rounded-lg p-7 text-3xl font-londrina flex flex-col", className)} {...rest}>{children}</div>
}