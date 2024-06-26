import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { CircleDollarSign, CornerDownRight, FerrisWheel, Shield, UserRound, UsersRound } from "lucide-react";
import { Settings } from "./components/settings/settings";
import { FecharListaButton } from "./components/fechar-lista-button";
import { ReabrirListaButton } from "./components/reabrir-lista-button";
import { CompartilharListaButton } from "./components/compartilhar-lista-button";
import { AdicionarJogadorButton } from "./components/adicionar-jogador-button";
import { AdicionarDespesaButton } from "./components/adicionar-despesa-button";
import { AdicionarTimeButton } from "./components/adicionar-time-button";
import { Button } from "@/components/button";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
                        <span className="hidden sm:inline self-end font-light text-lg font-museo text-muted">{rachao.local} - {format(rachao.diahora, "dd/MM/yyyy - HH:mm", {locale: ptBR})}</span>
                    </RachaoLayout.titleContainer>
                    <RachaoLayout.subtitle>{rachao.regras ? rachao.regras : 'As regras do rachão aparecerão aqui...'}</RachaoLayout.subtitle>
                </div>
                <Settings rachao={rachao}/>
            </RachaoLayout.header>

            <Divider/>

            {rachao.status && <CompartilharListaButton rachaoId={rachao.id}/>}

            <RachaoLayout.grid>
                {rachao.status && <AdicionarJogadorButton rachaoId={rachao.id}/>}
                {!rachao.status && <AdicionarTimeButton rachaoId={rachao.id} />}
                <AdicionarDespesaButton rachaoId={rachao.id}/>
            </RachaoLayout.grid>

            <Divider/>

            <RachaoLayout.grid>
                <Card.linkRoot href={`/meusrachas/${rachao.id}/jogadores`}>
                    <UserRound size={48} className="text-white"/>
                    <div className="text-right">
                        <Card.paragraph>Lista de jogadores</Card.paragraph>
                        <span className="font-light text-lg text-white">Na lista: {rachao._count.jogadores}</span>
                    </div>
                </Card.linkRoot>
                {!rachao.status && (
                    <Card.linkRoot href={`/meusrachas/${rachao.id}/times`}>
                        <Shield size={48} className="text-white"/>
                        <div className="text-right">
                            <Card.paragraph>Lista de times</Card.paragraph>
                            <span className="font-light text-lg text-white">Criados: {rachao._count.times}</span>
                        </div>
                    </Card.linkRoot>
                )}
                <Card.linkRoot href={`/meusrachas/${rachao.id}/despesas`}>
                    <CircleDollarSign size={48} className="text-white"/>
                    <div className="text-right">
                        <Card.paragraph>Lista de despesas</Card.paragraph>
                        <span className="font-light text-lg text-white">Total p/ pessoa: {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(rachao.custoPessoa)}</span>
                    </div>
                </Card.linkRoot>
            </RachaoLayout.grid>

            <Divider/>

            {rachao.status && <FecharListaButton rachaoId={rachao.id}/>}
            {!rachao.status && (
                <div className="flex gap-4 text-xl font-light h-12">
                    <ReabrirListaButton rachaoId={rachao.id}/>
                    <Button>
                        <Link href={`/meusrachas/${rachao.id}/elencos`} className="flex gap-2 items-center"><UsersRound size={28}/>Central de elencos</Link>
                    </Button>
                    <Button>
                        <Link href={`/meusrachas/${rachao.id}/sorteio`} className="flex gap-2 items-center"><FerrisWheel size={28}/>Sorteio</Link>
                    </Button>
                    <Button variant="outlined">
                        <Link href={`/meusrachas/${rachao.id}/resultados`} className="flex items-center gap-2">Ir para resultados <CornerDownRight size={28}/></Link>
                    </Button>
                </div>
            )}
        </RachaoLayout.container>
    )
}