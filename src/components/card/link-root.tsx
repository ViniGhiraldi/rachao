import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface ILinkRoot extends React.ComponentProps<'a'>{
    href: string;
}

export const LinkRoot = ({className, children, href, ...rest}: ILinkRoot) => {
    return <Link href={href} className={twMerge("border-4 border-primary p-5 rounded-xl font-londrina bg-black/40", className)} {...rest}>{children}</Link>
}