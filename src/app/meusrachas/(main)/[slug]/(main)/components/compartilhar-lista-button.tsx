import { Button } from "@/components/button"
import { environment } from "@/environment/environment"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ICompartilharListaButton{
    rachaoId: string;
}

export const CompartilharListaButton = ({ rachaoId }: ICompartilharListaButton) => {
    return (
        <Button className="text-base sm:text-xl">
            <Link target="_blank" href={`https://api.whatsapp.com/send/?text=${environment.baseURL}/${rachaoId}/listadepresenca&type=custom_url&app_absent=0`} className="flex items-center gap-3">
                <ExternalLink /> Compartilhar lista de presença
            </Link>
        </Button>
    )
}