import { twMerge } from "tailwind-merge"

interface IButton extends React.ComponentProps<'button'>{
    variant?: 'primary' | 'danger' | 'outlined'
    icon?: boolean
}

export const Button = ({variant = 'primary', icon, className, children, ...rest}: IButton) => {
    return <button data-variant={variant} data-icon={icon} className={twMerge("py-2 px-4 text-xl font-light rounded-lg shadow hover:brightness-90 active:brightness-80 disabled:opacity-50 data-[icon=true]:px-2 data-[variant=outlined]:bg-white data-[variant=outlined]:border data-[variant=primary]:bg-primary data-[variant=danger]:bg-danger data-[variant=danger]:text-white", className)} {...rest}>{children}</button>
}