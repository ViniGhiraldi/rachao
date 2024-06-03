import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { Shield } from "lucide-react";
import { CreateButton } from "./components/create-button/create-button";
import { getAllTimes } from "@/services/api/times/get-all-times";
import { getAllResultados } from "@/services/api/resultados/get-all-resultados";
import { Avatar } from "@/components/avatar";
import { DeleteButton } from "./components/delete-button";
import { EditButton } from "./components/edit-button/edit-button";

export default async function Resultados({ params }: { params: { slug: string } }) {
    const rachao = await getRachao(params.slug);
    const times = await getAllTimes(params.slug);
    const resultados = await getAllResultados(params.slug);

    if (typeof rachao === 'string' || !rachao) return <RachaoLayout.message>{rachao || "Rachão não encontrado ou existente!"}</RachaoLayout.message>
    if (typeof times === 'string' || !times) return <RachaoLayout.message>{times || "Não há times até o momento."}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>Resultados</RachaoLayout.title>
                </RachaoLayout.titleContainer>
            </RachaoLayout.header>

            <Divider />

            <RachaoLayout.grid>
                <RachaoLayout.grid className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <CreateButton rachaoId={rachao.id} times={times} />
                </RachaoLayout.grid>
                {typeof resultados === 'object' && resultados.map((resultado, i) => (
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col rounded-xl shadow border p-5 gap-4 bg-white" key={i}>
                            <div data-winner={resultado.timeCasaPontos > resultado.timeVisitantePontos} className="flex items-center gap-4 data-[winner=true]:text-primary">
                                <div className="flex flex-1 items-center gap-4">
                                    {resultado.timeCasa.imagem ? (
                                        <Avatar src={resultado.timeCasa.imagem.url} className="size-24" alt={resultado.timeCasa.nome} />
                                    ) : <Shield className="shrink-0 size-24" />}
                                    <span className="font-museo line-clamp-2 text-xl">{resultado.timeCasa.nome}</span>
                                </div>
                                <Divider vertical />
                                <span className="text-3xl">{resultado.timeCasaPontos}</span>
                            </div>
                            <div data-winner={resultado.timeVisitantePontos > resultado.timeCasaPontos} className="flex items-center gap-4 data-[winner=true]:text-primary">
                                <div className="flex flex-1 items-center gap-4">
                                    {resultado.timeVisitante.imagem ? (
                                        <Avatar src={resultado.timeVisitante.imagem.url} className="size-24" alt={resultado.timeVisitante.nome} />
                                    ) : <Shield className="shrink-0 size-24" />}
                                    <span className="font-museo line-clamp-2 text-xl">{resultado.timeVisitante.nome}</span>
                                </div>
                                <Divider vertical />
                                <span className="text-3xl">{resultado.timeVisitantePontos}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <EditButton resultado={resultado} times={times} />
                            <DeleteButton resultadoId={resultado.id} />
                        </div>
                    </div>
                ))}
            </RachaoLayout.grid>
        </RachaoLayout.container>
    )
}