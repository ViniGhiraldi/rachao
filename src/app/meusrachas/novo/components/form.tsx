'use client'

import { Button } from "@/components/button"
import { Label } from "@/components/label"
import { useForm } from "react-hook-form"
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { createRachao } from "@/services/api/rachas/create-rachao"
import { Modal } from "@/components/modal"
import { useState } from "react"
import { Divider } from "@/components/divider"
import { useRouter } from "next/navigation"

const schema = z.object({
    nome: z.string().trim().min(1, 'Este campo é obrigatório.'),
    modalidade: z.string().trim().min(1, 'Este campo é obrigatório.'),
    local: z.string().trim().min(1, 'Este campo é obrigatório.'),
    diahora: z.coerce.date().min(new Date(), 'A data deve ser válida.'),
    senha: z.string().min(5, "A senha precisa de pelo menos 5 caracteres.")
})

type Schema = z.infer<typeof schema>;

export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [rachaoId, setRachaoId] = useState<string>();

    const handleCreateRachao = async (data: Schema) => {
        setIsLoading(true);
        const result = await createRachao(data);
        if(typeof result === 'object'){
            setIsOpen(true);
            setRachaoId(result.id);
            toast.success(`${result.nome} criado com sucesso!`);
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
        router.replace(`/meusrachas/${rachaoId}`);
    }

    return (
        <>
            <form className="p-3 md:p-5 space-y-3" onSubmit={handleSubmit(handleCreateRachao)}>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="nome">Apelido do racha</Label>
                    <input type="text" disabled={isLoading} {...register('nome')} id="nome" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Racha do Pedrão" />
                    {errors.nome && <p className="text-sm font-londrina text-danger font-thin">{errors.nome.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="modalidade">Modalidade</Label>
                    <input type="text" disabled={isLoading} {...register('modalidade')} id="modalidade" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Futebol" />
                    {errors.modalidade && <p className="text-sm font-londrina text-danger font-thin">{errors.modalidade.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="local">Local</Label>
                    <input type="text" disabled={isLoading}  {...register('local')} id="local" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Ginásio local, Rua D. Pedro" />
                    {errors.local && <p className="text-sm font-londrina text-danger font-thin">{errors.local.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="diahora">Dia e Horário</Label>
                    <input type="datetime-local" disabled={isLoading} {...register('diahora')} id="diahora" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg"/>
                    {errors.diahora && <p className="text-sm font-londrina text-danger font-thin">{errors.diahora.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="senha">Senha</Label>
                    <input type="password" disabled={isLoading} {...register('senha')} id="senha" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="A senha é requerida ao abrir o rachão" />
                    {errors.senha && <p className="text-sm font-londrina text-danger font-thin">{errors.senha.message}</p>}
                </div>
                <Button disabled={isLoading} className="w-full sm:w-auto" type="submit">Criar</Button>
            </form>
            <Modal.root isOpen={isOpen} handleOnClose={handleCloseModal}>
                <Modal.content>
                    <Modal.attention/>
                    <Divider/>
                    <Modal.paragraph>Os seus rachas são exibidos graças aos cookies, se eles forem apagados você perderá todos eles!</Modal.paragraph>
                    <Button className="self-start" onClick={handleCloseModal}>Entendido!</Button>
                </Modal.content>
            </Modal.root>
        </>
    )
}