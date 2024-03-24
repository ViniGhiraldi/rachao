import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { Settings } from "lucide-react";

export default function Rachao({ params }: {params: {slug: string}}){
    return(
        <div>
            <RachaoLayout.header>
                <div className="">
                    <div className="flex items-center gap-7">
                        <RachaoLayout.navigateBack/>
                        <RachaoLayout.title>{params.slug}</RachaoLayout.title>
                        <span className="flex items-center gap-3 font-museo">
                            <div className="size-3 bg-primary rounded-full"/>
                            Em aberto
                        </span>
                    </div>
                    <RachaoLayout.subtitle>As regras do rachão aparecerão aqui...</RachaoLayout.subtitle>
                </div>
                <Settings/>
            </RachaoLayout.header>
            <Divider className="mt-7"/>
        </div>
    )
}