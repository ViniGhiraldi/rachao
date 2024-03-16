import { Card } from "@/components/card";
import { Divider } from "@/components/divider";
import { RachaoLayout } from "@/components/rachao-layout";
import Link from "next/link";

export default function Meusrachas() {
    return(
        <div className="">
            <RachaoLayout.root>
                <RachaoLayout.title>Meus rachas</RachaoLayout.title>
                <RachaoLayout.link href="/meusrachas/novo"><span className="text-lime-400">+</span> Criar rachão</RachaoLayout.link>
            </RachaoLayout.root>
            <Divider className="mt-7"/>
            <div className="grid grid-cols-4 mt-7 gap-10">
                <Card.root href="/">
                    <Card.title>Racha do Pedrão</Card.title>
                    <Card.content>
                    <p className="">Modalidade: <span className="font-kalam">Futebol</span></p>
                        <p>Local: <span className="font-kalam">Ginásio local, Rua...</span></p>
                        <p>Data: <span className="font-kalam">05/03/2024 - 18:00</span></p>
                        <p>Confirmados: <span className="font-kalam">26</span></p>
                        <p>Status: <span className="font-kalam text-lime-400">Em aberto</span></p>
                    </Card.content>
                </Card.root>
            </div>
        </div>
    );
}