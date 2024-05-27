'use client'

import { Button } from "@/components/button"
import { Label } from "@/components/label"
import { Form as ComponentForm } from "@/components/form"
import { useForm } from "react-hook-form"
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { createRachao } from "@/services/api/rachas/create-rachao"
import { useState } from "react"
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

    const handleCreateRachao = async (data: Schema) => {
        setIsLoading(true);
        const result = await createRachao(data);
        if(typeof result === 'object'){
            toast.info(`Não delete os cookies, senão seus rachas não serão exibidos!`);
            router.replace(`/meusrachas/${result.id}`);
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return (
        <>
            <ComponentForm.root className="p-3 md:p-5 w-auto" onSubmit={handleSubmit(handleCreateRachao)}>
                <ComponentForm.fieldContainer>
                    <Label htmlFor="nome">Apelido do racha</Label>
                    <input type="text" disabled={isLoading} {...register('nome')} id="nome" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Racha do Pedrão" />
                    {errors.nome && <ComponentForm.errorParagraph>{errors.nome.message}</ComponentForm.errorParagraph>}
                </ComponentForm.fieldContainer>
                <ComponentForm.fieldContainer>
                    <Label htmlFor="modalidade">Modalidade</Label>
                    <input type="text" disabled={isLoading} {...register('modalidade')} id="modalidade" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Futebol" />
                    {errors.modalidade && <ComponentForm.errorParagraph>{errors.modalidade.message}</ComponentForm.errorParagraph>}
                </ComponentForm.fieldContainer>
                <ComponentForm.fieldContainer>
                    <Label htmlFor="local">Local</Label>
                    <input type="text" disabled={isLoading}  {...register('local')} id="local" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Ginásio local, Rua D. Pedro" />
                    {errors.local && <ComponentForm.errorParagraph>{errors.local.message}</ComponentForm.errorParagraph>}
                </ComponentForm.fieldContainer>
                <ComponentForm.fieldContainer>
                    <Label htmlFor="diahora">Dia e Horário</Label>
                    <input type="datetime-local" disabled={isLoading} {...register('diahora')} id="diahora" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg"/>
                    {errors.diahora && <ComponentForm.errorParagraph>{errors.diahora.message}</ComponentForm.errorParagraph>}
                </ComponentForm.fieldContainer>
                <ComponentForm.fieldContainer>
                    <Label htmlFor="senha">Senha</Label>
                    <input type="password" disabled={isLoading} {...register('senha')} id="senha" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="A senha é requerida ao abrir o rachão" />
                    {errors.senha && <ComponentForm.errorParagraph>{errors.senha.message}</ComponentForm.errorParagraph>}
                </ComponentForm.fieldContainer>
                <Button disabled={isLoading} className="w-full sm:w-auto" type="submit">Criar</Button>
            </ComponentForm.root>
        </>
    )
}