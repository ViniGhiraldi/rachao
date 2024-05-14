import { Divider } from "@/components/divider";
import { Paragraph } from "@/components/paragraph";
import { RachaoLayout } from "@/components/rachao-layout";
import { Plus, UserRound } from "lucide-react";
import { getTime } from "@/services/api/times/get-time";
import { Status } from "@/components/status";
import { AddButton } from "./components/add-button";
import { DeleteButton } from "./components/delete-button";
import { Avatar } from "@/components/avatar";

export default async function Time({ params }: { params: { slug: string; timeId: string } }) {
    const time = await getTime(params.slug, params.timeId);

    if(typeof time === 'string' || !time.time) return <RachaoLayout.message>{time as string || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>{time.time.nome}</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                {/* <AdicionarTimeButton rachaoId={rachao.id}/> */}
            </RachaoLayout.header>

            <Divider />

            {time.time.jogadores.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {time.time.jogadores.map(jogador => (
                        <div className="flex flex-col p-4 rounded-lg shadow border max-w-full" key={jogador.id}>
                            {jogador.imagem ? (
                                <Avatar src={jogador.imagem?.url} alt={jogador.nome} className="self-center" />
                            ) : (
                                <UserRound className="shrink-0 size-36 self-center" />
                            )}
                            <div className="flex gap-3 items-center mt-4">
                                <Status status={jogador.presenca} className=""/>
                                <DeleteButton jogadorId={jogador.id} />
                            </div>
                                <div className="flex-1 flex gap-3 items-center">
                                    <Paragraph className="line-clamp-1 text-2xl">{jogador.nome}</Paragraph>
                                </div>
                        </div>
                    ))}
                </div>
            ) : <RachaoLayout.message>Ainda não há nenhum jogador neste time.</RachaoLayout.message>}
            {time.jogadores.length > 0 && (
                <>
                <Divider/>
                <Paragraph className="">Mais jogadores</Paragraph>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {time.jogadores.map((jogador) => (
                        <div className="flex gap-4 items-start h-28 border shadow bg-white rounded-lg p-2 max-w-full" key={jogador.id}>
                            {jogador.imagem ? (
                                <Avatar src={jogador.imagem?.url} alt={jogador.nome} className="size-24" />
                            ) : (
                                <UserRound className="size-24 shrink-0" />
                            )}
                            <div className="overflow-hidden">
                                <div className="flex gap-2 items-center">
                                    <Status status={jogador.presenca}/>
                                    <Paragraph className="line-clamp-1 text-2xl">{jogador.nome}</Paragraph>
                                </div>
                                {jogador.time && <p className="font-light text-sm line-clamp-1">Time: <span className="font-kalam font-bold">{jogador.time.nome}</span></p>}
                                <AddButton jogadorId={jogador.id} timeId={time.time.id}>{jogador.time ? 'Alterar' : 'Add'}</AddButton>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}
        </RachaoLayout.container>
    )
}