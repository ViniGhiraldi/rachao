import { Divider } from "@/components/divider";
import { Paragraph } from "@/components/paragraph";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllTimes } from "@/services/api/times/get-all-times";
import { Shield, UserRoundPlus } from "lucide-react";
import { getRachao } from "@/services/api/rachas/get-rachao";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";

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
                        <Avatar src={time.imagem?.url} alt={time.nome} />
                    ) : (
                        <Shield className="size-36 shrink-0" />
                    )}
                    <Divider vertical />
                    <div className="h-full flex flex-col">
                        <div className="flex-1 text-lg font-light">
                            <Paragraph className="line-clamp-1">{time.nome}</Paragraph>
                            <p>Jogadores: <span className="font-kalam font-bold">{time._count.jogadores}</span></p>
                            <Button icon variant="outlined">
                                <Link href={`/meusrachas/${rachao.id}/elencos/${time.id}`}><UserRoundPlus size={28}/></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </RachaoLayout.container>
    )
}