import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface ISubLink extends React.ComponentProps<'a'>{
    href: string;
}

export const SubLink = ({className, children, href, ...rest}: ISubLink) => {
    return <Link href={href} className={twMerge("text-3xl hover:underline", className)} {...rest}>{children}</Link>
}