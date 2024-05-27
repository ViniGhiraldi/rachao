import { Divider } from "@/components/divider";
import { Paragraph } from "@/components/paragraph";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllJogadores } from "@/services/api/jogadores/get-all-jogadores";
import { UserRound } from "lucide-react";
import { DeleteButton } from "./components/delete-button";
import { EditButton } from "./components/edit-button/edit-button";
import { Status } from "@/components/status";
import { ConfirmarButton } from "./components/confirmar-button";
import { AdicionarJogadorButton } from "./components/adicionar-jogador-button";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { Avatar } from "@/components/avatar";

export default async function Jogadores({ params }: { params: { slug: string } }) {
    const jogadores = await getAllJogadores(params.slug, 'presenca');
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string' || !rachao) return <RachaoLayout.message>{rachao || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>Lista de jogadores</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                <AdicionarJogadorButton rachaoId={rachao.id}/>
            </RachaoLayout.header>

            <Divider />

            {(typeof jogadores === 'string' || !jogadores) ? (
                <RachaoLayout.message>{jogadores || "Não há jogadores até o momento."}</RachaoLayout.message>
            ) : jogadores.map(jogador => (
                <div className="flex gap-4 items-start h-36 w-fit" key={jogador.id}>
                    {jogador.imagem ? (
                        <Avatar src={jogador.imagem?.url} alt={jogador.nome}/>
                    ) : (
                        <UserRound className="shrink-0 size-36" />
                    )}
                    <Divider vertical />
                    <div className="h-full flex flex-col">
                        <div className="flex-1">
                            <div className="flex gap-3 items-center">
                                <Status status={jogador.presenca}/>
                                <Paragraph className="line-clamp-1">{jogador.nome}</Paragraph>
                            </div>
                            {jogador.time && <p className="font-light text-lg">Time: <span className="font-kalam font-bold">{jogador.time.nome}</span></p>}
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