import { Divider } from "@/components/divider";
import { Paragraph } from "@/components/paragraph";
import { RachaoLayout } from "@/components/rachao-layout";
import { Plus, Shield, UserRound } from "lucide-react";
import { getTime } from "@/services/api/times/get-time";
import { Status } from "@/components/status";

export default async function Time({ params }: { params: { timeId: string } }) {
    const time = await getTime(params.timeId);

    if(typeof time === 'string' || !time) return <RachaoLayout.message>{time || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>{time.nome}</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                {/* <AdicionarTimeButton rachaoId={rachao.id}/> */}
            </RachaoLayout.header>

            <Divider />

            {time.jogadores.length > 0 ? time.jogadores.map(jogador => (
                <div className="flex gap-4 items-start h-36 w-fit" key={jogador.id}>
                    {jogador.imagem ? (
                        <img src={jogador.imagem?.url} alt={jogador.nome} className="h-full w-auto max-w-36 object-cover rounded-lg" />
                    ) : (
                        <UserRound className="h-full w-36" />
                    )}
                    <Divider vertical />
                    <div className="flex flex-col font-londrina">
                        <div className="flex gap-3 items-center">
                            <Status status={jogador.presenca}/>
                            <Paragraph className="line-clamp-1">{jogador.nome}</Paragraph>
                        </div>
                        X
                        {/* <DeleteButton jogadorId={jogador.id} /> */}
                    </div>
                </div>
            )) : <RachaoLayout.message>Ainda não há nenhum jogador neste time.</RachaoLayout.message>}
        </RachaoLayout.container>
    )
}