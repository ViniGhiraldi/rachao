import { twMerge } from "tailwind-merge"

export const Image = ({className, ...rest}: React.ComponentProps<'img'>) => {
    return <img className={twMerge("w-full h-full aspect-square object-cover", className)} {...rest}/>
}