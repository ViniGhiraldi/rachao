import { twMerge } from "tailwind-merge"
import { Label } from "./label"

export const Toggle = ({className, children, ...rest}: React.ComponentProps<'label'>) => {
    return <Label className={twMerge("relative w-11 h-6 bg-muted-foreground peer-focus:ring-1 peer-focus:ring-black peer-disabled:opacity-50 rounded-full cursor-pointer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-danger peer-checked:after:bg-primary after:rounded-full after:h-5 after:w-5 after:transition-all", className)} {...rest}>{children}</Label>
}