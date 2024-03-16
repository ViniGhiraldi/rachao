import { twMerge } from "tailwind-merge";

interface IDivider extends React.ComponentProps<'div'>{
    vertical?: boolean;
}

export const Divider = ({vertical, className, ...rest}: IDivider) => {
    return <div data-vertical={vertical} className={twMerge("w-full data-[vertical=true]:w-px h-px data-[vertical=true]:h-full bg-zinc-400", className)} {...rest}/>
}