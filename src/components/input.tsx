'use client'

import { useLoadingContext } from "@/contexts/loading-context"
import { twMerge } from "tailwind-merge"

export const Input = ({className, ...rest}: React.ComponentProps<'input'>) => {
    const { isLoading } = useLoadingContext();

    return <input disabled={isLoading} className={twMerge("border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg disabled:opacity-50", className)} {...rest} />
}