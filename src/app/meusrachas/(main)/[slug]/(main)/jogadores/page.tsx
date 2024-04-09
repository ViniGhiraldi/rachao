import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllJogadores } from "@/services/api/jogadores/get-all-jogadores";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { Plus } from "lucide-react";

export default async function Jogadores({ params }: { params: { slug: string } }) {
    const jogadores = await getAllJogadores(params.slug, 'presenca');

    if(typeof jogadores === 'string' || !jogadores) return <RachaoLayout.message>{jogadores || "Não há jogadores até o momento."}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>Lista de jogadores</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                <RachaoLayout.link href="/" className="flex items-center gap-1">
                    <Plus className="text-primary" size={28} />
                    <span className="hidden sm:inline-block">Add jogador</span>
                </RachaoLayout.link>
            </RachaoLayout.header>
            
            <Divider/>
        </RachaoLayout.container>
    )
}