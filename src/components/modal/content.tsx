import { twMerge } from "tailwind-merge";

export const Content = ({className, children, ...rest}: React.ComponentProps<'div'>) => {
    return <div className={twMerge("w-full sm:w-1/2 bg-background sm:rounded-lg p-3 md:p-5 text-3xl font-londrina flex flex-col items-center gap-3 text-center", className)} {...rest}>{children}</div>
}