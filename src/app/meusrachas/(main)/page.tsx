import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import { Plus } from "lucide-react";

export default async function Meusrachas() {
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
                <Card.root href="/">
                    <Card.title>Racha do Pedrão</Card.title>
                    <Card.content>
                        <p className="">Modalidade: <span className="font-kalam">Futebol</span></p>
                        <p>Local: <span className="font-kalam">Ginásio local, Rua...</span></p>
                        <p>Data: <span className="font-kalam">05/03/2024 - 18:00</span></p>
                        <p>Confirmados: <span className="font-kalam">26</span></p>
                        <p>Status: <span className="font-kalam text-primary">Em aberto</span></p>
                    </Card.content>
                </Card.root>
            </div>
        </div>
    );
}