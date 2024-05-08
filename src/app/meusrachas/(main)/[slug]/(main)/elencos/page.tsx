import { Divider } from "@/components/divider";
import { Paragraph } from "@/components/paragraph";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllTimes } from "@/services/api/times/get-all-times";
import { Plus, Shield } from "lucide-react";
import { getRachao } from "@/services/api/rachas/get-rachao";
import Link from "next/link";

export default async function Elencos({ params }: { params: { slug: string } }) {
    const times = await getAllTimes(params.slug);
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string' || !rachao) return <RachaoLayout.message>{rachao || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>Central de Elencos</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                {/* <AdicionarTimeButton rachaoId={rachao.id}/> */}
            </RachaoLayout.header>

            <Divider />

            {(typeof times === 'string' || !times) ? (
                <RachaoLayout.message>{times || "Não há jogadores até o momento."}</RachaoLayout.message>
            ) : times.map(time => (
                <div className="flex gap-4 items-start h-36 w-fit" key={time.id}>
                    {time.imagem ? (
                        <img src={time.imagem?.url} alt={time.nome} className="h-full w-auto max-w-36 object-cover rounded-lg" />
                    ) : (
                        <Shield className="h-full w-36" />
                    )}
                    <Divider vertical />
                    <div className="h-full flex flex-col font-londrina">
                        <div className="flex-1">
                            <Paragraph className="line-clamp-1">{time.nome}</Paragraph>
                            <p className="font-light text-lg">Jogadores: <span className="font-kalam font-bold">{time._count.jogadores}</span></p>
                            <Link href={`/meusrachas/${rachao.id}/elencos/${time.id}`} className="text-xl font-light flex items-center gap-2"><Plus size={28} className="text-primary"/> add jogadores</Link>
                        </div>
                    </div>
                </div>
            ))}
        </RachaoLayout.container>
    )
}