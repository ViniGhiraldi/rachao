import { Divider } from "@/components/divider";
import { Paragraph } from "@/components/paragraph";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllJogadores } from "@/services/api/jogadores/get-all-jogadores";
import { Plus, UserRound } from "lucide-react";
import { DeleteButton } from "./components/delete-button";
import { EditButton } from "./components/edit-button/edit-button";
import { Status } from "@/components/status";
import { ConfirmarButton } from "./components/confirmar-button";

export default async function Jogadores({ params }: { params: { slug: string } }) {
    const jogadores = await getAllJogadores(params.slug, 'presenca');

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

            <Divider />

            {(typeof jogadores === 'string' || !jogadores) ? (
                <RachaoLayout.message>{jogadores || "Não há jogadores até o momento."}</RachaoLayout.message>
            ) : jogadores.map(jogador => (
                <div className="flex gap-4 items-start h-36 w-fit" key={jogador.id}>
                    {jogador.imagem ? (
                        <img src={jogador.imagem?.url} alt={jogador.nome} className="h-full w-auto max-w-36 object-cover rounded-lg" />
                    ) : (
                        <UserRound className="h-full w-36" />
                    )}
                    <Divider vertical />
                    <div className="h-full flex flex-col font-londrina">
                        <div className="flex-1">
                            <div className="flex gap-3 items-center">
                                <Status status={jogador.presenca}/>
                                <Paragraph className="line-clamp-1">{jogador.nome}</Paragraph>
                            </div>
                            <p className="font-light text-lg">Time: <span className="font-kalam font-bold">Templários FC</span></p>
                            <div className="flex gap-2 items-center">
                                <EditButton jogador={jogador} />
                                <DeleteButton jogadorId={jogador.id} />
                                {!jogador.presenca && <ConfirmarButton jogadorId={jogador.id}/>}
                            </div>
                        </div>
                        <p className="text-2xl font-light">Nota: <span className="font-museo text-muted">{jogador.nota?.toFixed(2).replace('.', ',')}</span></p>
                    </div>
                </div>
            ))}
        </RachaoLayout.container>
    )
}