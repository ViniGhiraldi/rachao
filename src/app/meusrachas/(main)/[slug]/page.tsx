import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { getRachao } from "@/services/api/rachas/get-rachao";
import { Settings } from "lucide-react";

export default async function Rachao({ params }: {params: {slug: string}}){
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string') return <h1 className="text-xl">{rachao}</h1>

    return(
        <div>
            <RachaoLayout.header>
                <div className="">
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
                <Settings/>
            </RachaoLayout.header>
            <Divider className="mt-7"/>
        </div>
    )
}