import { twMerge } from "tailwind-merge";

interface IDivider extends React.ComponentProps<'div'>{
    vertical?: boolean;
}

export const Divider = ({vertical = false, className, ...rest}: IDivider) => {
    return <div data-vertical={vertical} className={twMerge("shrink-0 data-[vertical=false]:w-full data-[vertical=true]:w-px data-[vertical=false]:h-px data-[vertical=true]:h-full bg-zinc-400", className)} {...rest}/>
}