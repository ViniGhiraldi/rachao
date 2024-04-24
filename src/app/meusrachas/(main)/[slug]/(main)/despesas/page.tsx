import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllDespesas } from "@/services/api/despesas/get-all-despesas";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { Pen, Plus, X } from "lucide-react";
import { DeleteButton } from "./components/delete-button";
import { EditButton } from "./components/edit-button/edit-button";

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
                <RachaoLayout.link href="/" className="flex items-center gap-1">
                    <Plus className="text-primary" size={28} />
                    <span className="hidden sm:inline-block">Add despesa</span>
                </RachaoLayout.link>
            </RachaoLayout.header>

            <Divider />

            <div className="space-y-3 md:space-y-4 w-fit">
                <div className="flex gap-3 md:gap-4 items-center h-10 ">
                    <span className="font-londrina text-4xl">Total: <span className="font-museo text-danger">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(rachao.custoTotal)}</span></span>
                    <Divider vertical/>
                    <span className="font-londrina text-4xl">Total p/ pessoa: <span className="font-museo text-danger">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(rachao.custoPessoa)}</span></span>
                </div>

                <Divider/>

                {(typeof despesas === 'string' || !despesas) ? (
                    <RachaoLayout.message>{despesas || "Não há despesas até o momento."}</RachaoLayout.message>
                ) : despesas.map((despesa, i) => (
                    <div className="flex items-center h-8 gap-3 md:gap-4 text-lg" key={i}>
                        <span className="text-2xl font-londrina font-light">{despesa.titulo}</span>
                        <Divider vertical/>
                        <span className="font-museo">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(despesa.custoUnitario)}</span>
                        <Divider vertical/>
                        <span className="font-kalam">{despesa.quantidade}x</span>
                        <Divider vertical/>
                        <span className="font-museo">{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(despesa.custoTotal)}</span>
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