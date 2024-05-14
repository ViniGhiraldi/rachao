import React from "react"
import { twMerge } from "tailwind-merge"

export const Avatar = ({className, ...rest}: React.ComponentProps<'img'>) => {
    return <img className={twMerge("shrink-0 size-36 object-cover rounded-lg", className)} {...rest} />
}