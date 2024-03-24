'use client'

import { CornerUpLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const NavigateBack = () => {
    const router = useRouter();

    return(
        <button onClick={() => router.back()}>
            <CornerUpLeft size={28}/>
        </button>
    )
}