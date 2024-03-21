import { Plus } from "lucide-react";
import { formatRelative } from 'date-fns';
import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllRachao } from "@/services/api/rachas/get-all-rachao";
import { ptBR } from "date-fns/locale";

export default async function Meusrachas() {
    const rachas = await getAllRachao();

    return(
        <div>
            <RachaoLayout.root>
                <RachaoLayout.title>Meus rachas</RachaoLayout.title>
                <RachaoLayout.link href="/meusrachas/novo" className="text-3xl flex items-center gap-1">
                    <Plus className="text-primary" size={28}/>
                    <span className="hidden sm:inline-block">Criar rachão</span>
                </RachaoLayout.link>
            </RachaoLayout.root>
            <Divider className="mt-2 sm:mt-7"/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7 gap-10">
                {rachas?.map((rachao, i) => (
                    <Card.root href={`/meusrachas/${rachao.id}`} key={i}>
                        <Card.title>{rachao.nome}</Card.title>
                        <Card.content>
                            <p>Modalidade: <span className="font-kalam">{rachao.modalidade}</span></p>
                            <p>Local: <span className="font-kalam">{rachao.local}</span></p>
                            <p>Data: <span className="font-kalam">{formatRelative(rachao.diahora, new Date(), {locale: ptBR})}</span></p>
                            <p>Jogadores: <span className="font-kalam">{rachao._count.jogadores}</span></p>
                            <p>Status: <span data-status={rachao.status} className="font-kalam data-[status=true]:text-primary data-[status=false]:text-danger">
                                    {rachao.status ? 'Em aberto' : 'Fechado'}
                                </span>
                            </p>
                        </Card.content>
                    </Card.root>
                ))}
            </div>
        </div>
    );
}