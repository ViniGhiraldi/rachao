'use client'

import { Button } from "@/components/button"
import { Label } from "@/components/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { createRachao } from "@/services/api/rachas/create-rachao"
import { Modal } from "@/components/modal"
import { useState } from "react"
import { AlertTriangle } from "lucide-react"
import { Divider } from "@/components/divider"

const schema = z.object({
    nome: z.string().min(1, 'Este campo é obrigatório.'),
    modalidade: z.string().min(1, 'Este campo é obrigatório.'),
    local: z.string().min(1, 'Este campo é obrigatório.'),
    diahora: z.coerce.date().min(new Date(), 'A data deve ser válida.'),
    senha: z.string().min(5, "A senha precisa de pelo menos 5 caracteres.")
})

type Schema = z.infer<typeof schema>;

export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleCreateRachao = async (data: Schema) => {
        setIsLoading(true);
        const result = await createRachao(data);
        if(result){
            setIsOpen(true);
        }
        setIsLoading(false);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <form className="p-4 space-y-3" onSubmit={handleSubmit(handleCreateRachao)}>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="nome">Apelido do racha</Label>
                    <input type="text" disabled={isLoading} {...register('nome')} id="nome" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Racha do Pedrão" />
                    {errors.nome && <p className="text-sm font-londrina text-danger font-thin">{errors.nome.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="modalidade">Modalidade</Label>
                    <input type="text" disabled={isLoading} {...register('modalidade')} id="modalidade" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Futebol" />
                    {errors.modalidade && <p className="text-sm font-londrina text-danger font-thin">{errors.modalidade.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="local">Local</Label>
                    <input type="text" disabled={isLoading}  {...register('local')} id="local" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Ginásio local, Rua D. Pedro" />
                    {errors.local && <p className="text-sm font-londrina text-danger font-thin">{errors.local.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="diahora">Dia e Horário</Label>
                    <input type="datetime-local" disabled={isLoading} {...register('diahora')} id="diahora" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg"/>
                    {errors.diahora && <p className="text-sm font-londrina text-danger font-thin">{errors.diahora.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="senha">Senha</Label>
                    <input type="password" disabled={isLoading} {...register('senha')} id="senha" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="A senha é requerida ao abrir o rachão" />
                    {errors.senha && <p className="text-sm font-londrina text-danger font-thin">{errors.senha.message}</p>}
                </div>
                <Button disabled={isLoading} className="w-full sm:w-auto" type="submit">Criar</Button>
            </form>
            <Modal.root isOpen={isOpen} handleOnClose={handleCloseModal}>
                <Modal.content className="text-center items-center gap-3">
                    <h1 className="flex items-center gap-3 w-fit text-danger"><AlertTriangle size={28}/> Atenção <AlertTriangle size={28}/></h1>
                    <Divider/>
                    <p className="text-xl font-thin">Os seus rachas são exibidos graças aos cookies, se eles forem apagados você perderá todos eles!</p>
                    <Button className="self-start" onClick={handleCloseModal}>Entendido!</Button>
                </Modal.content>
            </Modal.root>
        </>
    )
}