import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { Paragraph } from "@/components/paragraph";
import { RachaoLayout } from "@/components/rachao-layout";
import { IGetAllJogadoresResponsePresenca, getAllJogadores } from "@/services/api/jogadores/get-all-jogadores";
import { Pen, Plus, X } from "lucide-react";
import { DeleteButton } from "./components/delete-button";

export default async function Jogadores({ params }: { params: { slug: string } }) {
    const jogadores = await getAllJogadores(params.slug, 'presenca') as string | IGetAllJogadoresResponsePresenca;

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

            {(typeof jogadores === 'string' || !jogadores) ? (
                <RachaoLayout.message>{jogadores || "Não há jogadores até o momento."}</RachaoLayout.message>
            ) : (
                <>
                    <Paragraph className="text-primary">Confirmados</Paragraph>
                    {jogadores.confirmados.map((jogador, i) => (
                        <div className="flex gap-4 items-start h-32 w-fit" key={i}>
                            <img src={jogador.imagem?.url} alt={jogador.nome} className="h-full w-auto max-w-32 object-cover rounded-lg"/>
                            <Divider vertical/>
                            <div className="h-full flex flex-col font-londrina">
                                <div className="flex-1">
                                    <Paragraph>{jogador.nome}</Paragraph>
                                    {jogador.time && <p className="font-light">Time: <span className="font-kalam font-bold">{jogador.time.nome}</span></p>}
                                    <div className="flex gap-2">
                                        <Button icon variant="outlined"><Pen size={20}/></Button>
                                        <DeleteButton jogadorId={jogador.id}/>
                                    </div>
                                </div>
                                <p className="text-2xl font-light">Nota: <span className="font-museo text-muted">{Number(jogador.nota).toFixed(2).replace('.', ',')}</span></p>
                            </div>
                        </div>
                    ))}
                    <Paragraph className="text-danger">Pendentes</Paragraph>
                    {jogadores.pendentes.map((jogador, i) => (
                        <div className="flex gap-4 items-start h-32 w-fit" key={i}>
                            <img src={jogador.imagem?.url} alt={jogador.nome} className="h-full w-auto max-w-32 object-cover rounded-lg"/>
                            <Divider vertical/>
                            <div className="h-full flex flex-col font-londrina">
                                <div className="flex-1">
                                    <Paragraph>{jogador.nome}</Paragraph>
                                    {jogador.time && <p className="font-light">Time: <span className="font-kalam font-bold">{jogador.time.nome}</span></p>}
                                    <div className="flex gap-2 items-center">
                                        <Button icon variant="outlined"><Pen size={20}/></Button>
                                        <DeleteButton jogadorId={jogador.id}/>
                                        <button className="text-primary text-xl font-light px-2 hover:underline">Confirmar</button>
                                    </div>
                                </div>
                                <p className="text-2xl font-light">Nota: <span className="font-museo text-muted">{Number(jogador.nota).toFixed(2).replace('.', ',')}</span></p>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </RachaoLayout.container>
    )
}