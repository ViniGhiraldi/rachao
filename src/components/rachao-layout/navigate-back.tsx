'use client'

import { CornerUpLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../button";

export const NavigateBack = () => {
    const router = useRouter();

    return(
        <Button variant="outlined" icon onClick={() => router.back()}>
            <CornerUpLeft size={28}/>
        </Button>
    )
}