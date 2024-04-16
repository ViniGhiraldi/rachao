import { twMerge } from "tailwind-merge"
import { Label } from "./label"

export const Toggle = ({className, children, ...rest}: React.ComponentProps<'label'>) => {
    return <Label className={twMerge("h-6 w-12 bg-muted-foreground hover:bg-muted rounded-full transition-colors cursor-pointer flex items-center px-0.5 peer-checked:justify-end after:absolute after:size-5 after:bg-danger peer-checked:after:bg-primary after:rounded-full", className)} {...rest}>{children}</Label>
}