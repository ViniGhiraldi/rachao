import { twMerge } from "tailwind-merge"

interface IButton extends React.ComponentProps<'button'>{
    variant?: 'primary' | 'danger' | 'outlined'
}

export const Button = ({variant = 'primary', className, children, ...rest}: IButton) => {
    return <button data-variant={variant} className={twMerge("py-2 px-4 rounded-lg data-[variant=primary]:bg-primary data-[variant=danger]:bg-danger data-[variant=danger]:text-white hover:ring-1 hover:ring-black font-londrina text-xl font-light", className)} {...rest}>{children}</button>
}