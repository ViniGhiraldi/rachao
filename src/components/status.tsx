import { CircleCheck, CircleHelp, LucideProps } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface IStatus extends LucideProps{
    status: boolean
}

export const Status = ({status, className, ...rest}: IStatus) => {

    if(status) return <CircleCheck size={24} className={twMerge("text-primary shrink-0", className)} {...rest}/>
    return <CircleHelp size={24} className={twMerge("text-danger shrink-0", className)} {...rest}/>
}