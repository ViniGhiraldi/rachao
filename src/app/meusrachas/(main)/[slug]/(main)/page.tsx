import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { CircleDollarSign, Shield, UserRound } from "lucide-react";
import { Settings } from "./components/settings/settings";
import { FecharListaButton } from "./components/fechar-lista-button";
import { ReabrirListaButton } from "./components/reabrir-lista-button";
import { CompartilharListaButton } from "./components/compartilhar-lista-button";
import { Status } from "@/components/status";
import { AdicionarJogadorButton } from "./components/adicionar-jogador-button/adicionar-jogador-button";
import { AdicionarDespesaButton } from "./components/adicionar-despesa-button/adicionar-despesa-button";

export default async function Rachao({ params }: {params: {slug: string}}){
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string' || !rachao) return <RachaoLayout.message>{rachao || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    return(
        <RachaoLayout.container>
            <RachaoLayout.header>
                <div className="space-y-2">
                    <RachaoLayout.titleContainer>
                        <RachaoLayout.navigateBack/>
                        <RachaoLayout.title>{rachao.nome}</RachaoLayout.title>
                        <div className="sm:flex sm:items-center sm:gap-3 self-end whitespace-nowrap">
                            <Status status={rachao.status}/>
                            <span className="hidden sm:inline sm:font-museo">{rachao.status ? 'Em aberto' : 'Fechado'}</span>
                        </div>
                    </RachaoLayout.titleContainer>
                    <RachaoLayout.subtitle>{rachao.regras ? rachao.regras : 'As regras do rachão aparecerão aqui...'}</RachaoLayout.subtitle>
                </div>
                <Settings rachao={rachao}/>
            </RachaoLayout.header>

            <Divider/>

            {rachao.status && <CompartilharListaButton rachaoId={rachao.id}/>}

            <RachaoLayout.grid>
                {rachao.status && <AdicionarJogadorButton rachaoId={rachao.id}/>}
                {!rachao.status && (
                    <Card.buttonRoot className="flex flex-col items-center justify-center h-60">
                        <Shield size={48} className="text-white"/>
                        <Card.paragraph>Adicionar Times</Card.paragraph>
                    </Card.buttonRoot>
                )}
                <AdicionarDespesaButton rachaoId={rachao.id}/>
            </RachaoLayout.grid>

            <Divider/>

            <RachaoLayout.grid>
                <Card.linkRoot href={`/meusrachas/${rachao.id}/jogadores`} className="flex justify-between items-center">
                    <UserRound size={48} className="text-white"/>
                    <div className="text-right">
                        <Card.paragraph>Lista de jogadores</Card.paragraph>
                        <span className="font-light text-lg text-white">Na lista: {rachao._count.jogadores}</span>
                    </div>
                </Card.linkRoot>
                {!rachao.status && (
                    <Card.linkRoot href="/" className="flex justify-between items-center">
                        <Shield size={48} className="text-white"/>
                        <div className="text-right">
                            <Card.paragraph>Lista de times</Card.paragraph>
                            <span className="font-light text-lg text-white">Criados: {rachao._count.times}</span>
                        </div>
                    </Card.linkRoot>
                )}
                <Card.linkRoot href={`/meusrachas/${rachao.id}/despesas`} className="flex justify-between items-center">
                    <CircleDollarSign size={48} className="text-white"/>
                    <div className="text-right">
                        <Card.paragraph>Lista de despesas</Card.paragraph>
                        <span className="font-light text-lg text-white">Valor total: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(rachao.custoTotal)}</span>
                    </div>
                </Card.linkRoot>
            </RachaoLayout.grid>

            <Divider/>

            {rachao.status && <FecharListaButton rachaoId={rachao.id}/>}
            {!rachao.status && <ReabrirListaButton rachaoId={rachao.id}/>}
        </RachaoLayout.container>
    )
}