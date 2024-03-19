'use client'

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Label } from "@/components/label"

export const Form = () => {
    return (
        <form className="p-4 space-y-2" onSubmit={() => {}}>
            <div className="flex flex-col gap-1">
                <Label htmlFor="nome">Apelido do racha</Label>
                <Input type="text" id="nome" placeholder="Ex.: Racha do Pedrão" />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="modalidade">Modalidade</Label>
                <Input type="text" id="modalidade" placeholder="Ex.: Futebol" />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="local">Local</Label>
                <Input type="text" id="local" placeholder="Ex.: Ginásio local, Rua D. Pedro" />
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="diahora">Dia e Horário</Label>
                <Input id="diahora" type="datetime-local"/>
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="A senha é requerida ao abrir o rachão" />
            </div>
            <Button className="w-full sm:w-auto" type="submit">Criar</Button>
        </form>
    )
}