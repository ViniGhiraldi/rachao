'use client'

import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { IJogador } from "@/models/jogador";
import { putJogador } from "@/services/api/jogadores/put-jogador";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    nome: z.string().trim().min(1, 'Este campo é obrigatório.'),
    presenca: z.boolean(),
    nota: z.number({invalid_type_error: 'A nota deve ser um valor entre 0 e 10.'}).nonnegative({message: 'A nota mínima é 0.'}).lte(10, {message: 'A nota máxima é 10.'}).multipleOf(0.01, {message: 'A nota deve ter no máximo 2 casas decimais.'}).optional(),
    imagem: z
    .custom<FileList>()
    .transform((file) => {
        return file.length > 0 ? file.item(0) : null
    })
})

type Schema = z.infer<typeof schema>;

interface IEditForm{
    jogador: Pick<IJogador, 'id' | 'nome' | 'presenca' | 'nota' | 'imagem'>;
    closeForm: () => void;
}

export const EditForm = ({jogador, closeForm}: IEditForm) => {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: jogador.nome,
            presenca: jogador.presenca,
            nota: jogador.nota
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [imagem, setImagem] = useState<File | null | undefined | string>(jogador.imagem?.url);

    const handleEditJogador = async (data: Schema) => {
        setIsLoading(true);
        const result = await putJogador(jogador.id, data)
        closeForm();
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return (
        <form className="space-y-3 w-full" encType="multipart/form-data" onSubmit={handleSubmit(handleEditJogador)}>
            <div className="flex flex-col gap-1">
                <input type="file" {...register('imagem')} disabled={isLoading} onChange={e => setImagem(e.currentTarget.files?.item(0))} id={`imagem-${jogador.id}`} className="sr-only" />
                <label htmlFor={`imagem-${jogador.id}`} className="size-40 border-4 border-dashed cursor-pointer border-primary rounded-lg overflow-hidden flex items-center justify-center text-muted text-center self-center">
                    {imagem ? <img src={typeof imagem === 'string' ? imagem : URL.createObjectURL(imagem)} className="w-full h-full aspect-square object-cover"/> : <span className="p-4">Clique para adicionar uma foto</span>}
                </label>
                {errors.imagem && <p className="text-sm font-londrina text-danger font-thin">{errors.imagem.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={`nome-${jogador.id}`}>Nome</Label>
                <input type="text" disabled={isLoading} {...register('nome')} id={`nome-${jogador.id}`} autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Nome do jogador" />
                {errors.nome && <p className="text-sm font-londrina text-danger font-thin">{errors.nome.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={`presenca-${jogador.id}`}>Presença</Label>
                <input type="checkbox" {...register('presenca')} disabled={isLoading} id={`presenca-${jogador.id}`} className="peer sr-only" />
                <Label htmlFor={`presenca-${jogador.id}`} className="h-6 w-12 bg-muted-foreground hover:bg-muted rounded-full transition-colors cursor-pointer flex items-center px-0.5 peer-checked:justify-end after:absolute after:size-5 after:bg-danger peer-checked:after:bg-primary after:rounded-full"/>
                {errors.presenca && <p className="text-sm font-londrina text-danger font-thin">{errors.presenca.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor={`nota-${jogador.id}`}>Nota</Label>
                <input type="number" step="any" disabled={isLoading} {...register('nota', {valueAsNumber: true})} id={`nota-${jogador.id}`} className="bg-transparent w-20 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0.00" />
                {errors.nota && <p className="text-sm font-londrina text-danger font-thin">{errors.nota.message}</p>}
            </div>

            <div className="self-start flex gap-3">
                <Button disabled={isLoading} type="submit">Salvar</Button>
                <Button variant="outlined" onClick={() => {reset(); closeForm();}} type="button">Cancelar</Button>
            </div>
        </form>
    )
}