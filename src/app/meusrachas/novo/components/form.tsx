'use client'

import { Button } from "@/components/button"
import { Label } from "@/components/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { createRachao } from "@/services/api/rachas/create-rachao"

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

    return (
        <form className="p-4 space-y-3" onSubmit={handleSubmit(async (data) => await createRachao(data))}>
            <div className="flex flex-col gap-1">
                <Label htmlFor="nome">Apelido do racha</Label>
                <input type="text" {...register('nome')} id="nome" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Racha do Pedrão" />
                {errors.nome && <p className="text-sm font-londrina text-danger font-thin">{errors.nome.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="modalidade">Modalidade</Label>
                <input type="text" {...register('modalidade')} id="modalidade" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Futebol" />
                {errors.modalidade && <p className="text-sm font-londrina text-danger font-thin">{errors.modalidade.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="local">Local</Label>
                <input type="text"  {...register('local')} id="local" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Ginásio local, Rua D. Pedro" />
                {errors.local && <p className="text-sm font-londrina text-danger font-thin">{errors.local.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="diahora">Dia e Horário</Label>
                <input type="datetime-local" {...register('diahora')} id="diahora" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg"/>
                {errors.diahora && <p className="text-sm font-londrina text-danger font-thin">{errors.diahora.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="senha">Senha</Label>
                <input type="password" {...register('senha')} id="senha" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="A senha é requerida ao abrir o rachão" />
                {errors.senha && <p className="text-sm font-londrina text-danger font-thin">{errors.senha.message}</p>}
            </div>
            <Button className="w-full sm:w-auto" type="submit">Criar</Button>
        </form>
    )
}