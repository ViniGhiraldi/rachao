import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllRachao } from "@/services/api/rachas/get-all-rachao";
import { Plus } from "lucide-react";

export default async function Meusrachas() {
    const rachas = await getAllRachao();

    return(
        <div className="">
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
                    <Card.root href={`/${rachao.id}`} key={i}>
                        <Card.title>{rachao.nome}</Card.title>
                        <Card.content>
                            <p>Modalidade: <span className="font-kalam">{rachao.modalidade}</span></p>
                            <p>Local: <span className="font-kalam">{rachao.local}</span></p>
                            <p>Data: <span className="font-kalam">{rachao.diahora.toISOString()}</span></p>
                            <p>Jogadores: <span className="font-kalam">{rachao._count.jogadores}</span></p>
                            <p>Status: <span className="font-kalam text-primary">{rachao.status}</span></p>
                        </Card.content>
                    </Card.root>
                ))}
            </div>
        </div>
    );
}