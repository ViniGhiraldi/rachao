import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { CircleDollarSign, ExternalLink, UserRound } from "lucide-react";

export default async function Rachao({ params }: {params: {slug: string}}){
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string') return <h1 className="text-xl">{rachao}</h1>

    return(
        <div className="space-y-3 md:space-y-7">
            <RachaoLayout.header>
                <div>
                    <div className="flex items-center gap-7">
                        <RachaoLayout.navigateBack/>
                        <RachaoLayout.title>{rachao.nome}</RachaoLayout.title>
                        <span className="flex items-center gap-3 font-museo">
                        <div data-status={rachao.status} className="data-[status=true]:bg-primary data-[status=false]:bg-danger size-3 rounded-full"/>
                            {rachao.status ? 'Em aberto' : 'Fechado'}
                        </span>
                    </div>
                    <RachaoLayout.subtitle>{rachao.regras ? rachao.regras : 'As regras do rachão aparecerão aqui...'}</RachaoLayout.subtitle>
                </div>
                <RachaoLayout.settings rachaoId={rachao.id}/>
            </RachaoLayout.header>
            <Divider/>
            <Button className="flex items-center gap-3 shadow-md"><ExternalLink/> Compartilhar lista de presença</Button>
            <RachaoLayout.grid>
                <Card.root href="/" className="flex flex-col items-center justify-center h-60">
                    <UserRound size={48} className="text-white"/>
                    <p className="font-light text-2xl text-white">Adicionar jogadores</p>
                </Card.root>
                <Card.root href="/" className="flex flex-col items-center justify-center h-60">
                    <CircleDollarSign size={48} className="text-white"/>
                    <p className="font-light text-2xl text-white">Adicionar despesa</p>
                </Card.root>
            </RachaoLayout.grid>
            <Divider/>
            <RachaoLayout.grid>
                <Card.root href="/" className="flex justify-between items-center">
                    <UserRound size={48} className="text-white"/>
                    <div className="text-right">
                        <p className="font-light text-2xl text-white">Lista de jogadores</p>
                        <span className="font-light text-lg text-white">Confirmados: 26</span>
                    </div>
                </Card.root>
                <Card.root href="/" className="flex justify-between items-center">
                    <CircleDollarSign size={48} className="text-white"/>
                    <div className="text-right">
                        <p className="font-light text-2xl text-white">Lista de despesas</p>
                        <span className="font-light text-lg text-white">Valor total: R$120,00</span>
                    </div>
                </Card.root>
            </RachaoLayout.grid>
        </div>
    )
}