import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllTimes } from "@/services/api/times/get-all-times";
import { getAllJogadores } from "@/services/api/jogadores/get-all-jogadores";
import { Sorteio } from "./components/sorteio";
import { getRachao } from "@/services/api/rachas/get-rachao";

export default async function Elencos({ params }: { params: { slug: string } }) {
    const rachao = await getRachao(params.slug);
    const times = await getAllTimes(params.slug);
    const jogadores = await getAllJogadores(params.slug);

    if(typeof rachao === 'string' || !rachao) return <RachaoLayout.message>{rachao || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>Sorteio</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                {/* <AdicionarTimeButton rachaoId={rachao.id}/> */}
            </RachaoLayout.header>

            <Divider />
            
            {(typeof times !== 'string' && times.length > 0 && typeof jogadores !== 'string' && jogadores.length > 0) ? <Sorteio rachaoId={rachao.id} jogadores={jogadores} times={times}/> : <RachaoLayout.message>Não há jogadores e/ou times até o momento.</RachaoLayout.message>}
        </RachaoLayout.container>
    )
}