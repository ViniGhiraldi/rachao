import { Plus } from "lucide-react";
import { formatRelative } from 'date-fns';
import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllRachao } from "@/services/api/rachas/get-all-rachao";
import { ptBR } from "date-fns/locale";

export default async function Meusrachas() {
    const rachas = await getAllRachao();

    return (
        <div className="space-y-3 md:space-y-4 p-5 md:p-20">
            <RachaoLayout.header>
                <RachaoLayout.title>Meus rachas</RachaoLayout.title>
                <RachaoLayout.link href="/meusrachas/novo" className="text-3xl flex items-center gap-1">
                    <Plus className="text-primary" size={28} />
                    <span className="hidden sm:inline-block">Criar rachão</span>
                </RachaoLayout.link>
            </RachaoLayout.header>
            <Divider/>
            {typeof rachas === 'object' && (
                <RachaoLayout.grid>
                    {rachas.map((rachao, i) => (
                        <Card.root href={`/meusrachas/${rachao.id}`} className="relative group" key={i}>
                            <div data-status={rachao.status} className="data-[status=true]:bg-primary data-[status=true]:animate-pulse data-[status=false]:bg-danger size-3 rounded-full absolute top-2 left-2" />
                            <Card.title>{rachao.nome}</Card.title>
                            <Card.content>
                                <p className="text-primary overflow-hidden text-ellipsis whitespace-nowrap">Modalidade: <span className="font-kalam text-white whitespace-normal">{rachao.modalidade}</span></p>
                                <p className="text-primary overflow-hidden text-ellipsis whitespace-nowrap">Local: <span className="font-kalam text-white whitespace-normal">{rachao.local}</span></p>
                                <p className="text-primary">Data: <span className="font-kalam text-white">{formatRelative(rachao.diahora, new Date(), { locale: ptBR })}</span></p>
                                <p className="text-primary">Jogadores: <span className="font-kalam text-white">{rachao._count.jogadores}</span></p>
                            </Card.content>
                        </Card.root>
                    ))}
                </RachaoLayout.grid>
            )}
            {typeof rachas === 'string' && <p>{rachas}</p>}
        </div>
    );
}