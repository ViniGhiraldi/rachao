import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllTimes } from "@/services/api/times/get-all-times";
import { getAllJogadores } from "@/services/api/jogadores/get-all-jogadores";
import { Paragraph } from "@/components/paragraph";
import { Avatar } from "@/components/avatar";
import { Shield, UserRound } from "lucide-react";
import { Status } from "@/components/status";
import { Toggle } from "@/components/toggle";
import { Button } from "@/components/button";
import { Sorteio } from "./components/sorteio";

export default async function Elencos({ params }: { params: { slug: string } }) {
    const times = await getAllTimes(params.slug);
    const jogadores = await getAllJogadores(params.slug);

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>Sorteio</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                {/* <AdicionarTimeButton rachaoId={rachao.id}/> */}
            </RachaoLayout.header>

            <Divider />
            
            {(typeof times !== 'string' && times.length > 0 && typeof jogadores !== 'string' && jogadores.length > 0) ? <Sorteio jogadores={jogadores} times={times}/> : <RachaoLayout.message>Não há jogadores e/ou times até o momento.</RachaoLayout.message>}
        </RachaoLayout.container>
    )
}