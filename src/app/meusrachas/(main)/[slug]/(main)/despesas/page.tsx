import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllDespesas } from "@/services/api/despesas/get-all-despesas";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { Pen, Plus, X } from "lucide-react";
import { DeleteButton } from "./components/delete-button";
import { EditButton } from "./components/edit-button/edit-button";
import { AdicionarDespesaButton } from "./components/adicionar-despesa-button";

export default async function Despesas({ params }: { params: { slug: string } }) {
    const despesas = await getAllDespesas(params.slug);
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string' || !rachao) return <RachaoLayout.message>{rachao || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    return (
        <RachaoLayout.container>
            <RachaoLayout.header>
                <RachaoLayout.titleContainer>
                    <RachaoLayout.navigateBack />
                    <RachaoLayout.title>Lista de despesas</RachaoLayout.title>
                </RachaoLayout.titleContainer>
                <AdicionarDespesaButton rachaoId={rachao.id}/>
            </RachaoLayout.header>

            <Divider />

            <div className="space-y-3 md:space-y-4 w-fit max-w-full">
                <div className="flex flex-col sm:flex-row sm:h-8 lg:h-10 sm:gap-3 md:gap-4 w-fit">
                    <span className="font-londrina text-xl sm:text-2xl lg:text-4xl">Total: <span className="font-museo text-danger">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(rachao.custoTotal)}</span></span>
                    <Divider vertical className="hidden sm:block"/>
                    <span className="font-londrina text-xl sm:text-2xl lg:text-4xl">Total p/ pessoa: <span className="font-museo text-danger">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(rachao.custoPessoa)}</span></span>
                </div>

                <Divider/>

                {(typeof despesas === 'string' || !despesas) ? (
                    <RachaoLayout.message>{despesas || "Não há despesas até o momento."}</RachaoLayout.message>
                ) : despesas.map((despesa, i) => (
                    <div className="flex items-center h-10 gap-2 md:gap-4 text-lg w-full overflow-x-auto overflow-y-hidden" key={i}>
                        <span className="text-base sm:text-xl md:text-2xl font-light whitespace-nowrap">{despesa.titulo}</span>
                        <Divider vertical/>
                        <span className="text-sm md:text-xl ">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(despesa.custoUnitario)}</span>
                        <Divider vertical/>
                        <span className="text-sm md:text-xl">{despesa.quantidade}x</span>
                        <Divider vertical/>
                        <span className="text-sm md:text-xl ">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(despesa.custoTotal)}</span>
                        <Divider vertical/>
                        <div className="flex gap-2 items-center">
                            <EditButton despesa={despesa} />
                            <DeleteButton despesaId={despesa.id}/>
                        </div>
                    </div>
                ))}
            </div>

        </RachaoLayout.container>
    )
}