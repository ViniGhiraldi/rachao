import { twMerge } from "tailwind-merge"

interface IStatus extends React.ComponentProps<'div'>{
    status: boolean
}

export const Status = ({status, className, ...rest}: IStatus) => {
    return <div data-status={status} className={twMerge("data-[status=true]:bg-primary data-[status=false]:bg-danger size-3 shrink-0 rounded-full", className)} {...rest}/>
}