import { AlertTriangle } from "lucide-react"
import { twMerge } from "tailwind-merge"

export const Attention = ({className, ...rest}: React.ComponentProps<'h1'>) => {
    return <h1 className={twMerge("flex items-center gap-3 w-fit text-danger", className)} {...rest}><AlertTriangle size={28}/> Atenção <AlertTriangle size={28}/></h1>
}