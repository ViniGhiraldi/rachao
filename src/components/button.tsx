import { twMerge } from "tailwind-merge"

interface IButton extends React.ComponentProps<'button'>{
    variant?: 'primary' | 'danger' | 'outlined'
    icon?: boolean
}

export const Button = ({variant = 'primary', icon, className, children, ...rest}: IButton) => {
    return <button data-variant={variant} data-icon={icon} className={twMerge("py-2 px-4 data-[icon=true]:px-2 rounded-lg data-[variant=primary]:bg-primary data-[variant=danger]:bg-danger data-[variant=danger]:text-white hover:ring-1 hover:ring-black font-londrina text-xl data-[variant=outlined]:text-2xl font-light data-[variant=outlined]:font-normal", className)} {...rest}>{children}</button>
}