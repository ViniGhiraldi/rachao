'use client'

import { Button } from "@/components/button";
import { Label } from "@/components/label"
import { createJogador } from "@/services/api/jogadores/create-jogador";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    nome: z.string().trim().min(1, 'Este campo é obrigatório.'),
    presenca: z.boolean(),
    imagem: z
    .custom<FileList>()
    .transform((file) => {
        return file.length > 0 ? file.item(0) : null
    })
})

type Schema = z.infer<typeof schema>;

interface IForm{
    rachaoId: string;
}

export const Form = ({ rachaoId }: IForm) => {
    const [imagem, setImagem] = useState<File | null>();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const handleCreateJogador = async (data: Schema) => {
        console.log(data)
        setIsLoading(true);
        const result = await createJogador(rachaoId, data);
        if(typeof result === 'object'){
            toast.success(`${result.nome} entrou pra lista!`);
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return (
        <form className="flex flex-col gap-4 font-museo" encType="multipart/form-data" onSubmit={handleSubmit(handleCreateJogador)}>
            <div className="flex flex-col gap-1">
                <input type="file" {...register('imagem')} disabled={isLoading} onChange={e => setImagem(e.currentTarget.files?.item(0))} id="imagem" className="sr-only" />
                <label htmlFor="imagem" className="size-40 border-4 border-dashed cursor-pointer border-primary rounded-lg overflow-hidden flex items-center justify-center text-muted text-center self-center">
                    {imagem ?<img src={URL.createObjectURL(imagem)} className="w-full h-full aspect-square object-cover"/> : <span className="p-4">Clique para adicionar uma foto</span>}
                </label>
                {errors.imagem && <p className="text-sm font-londrina text-danger font-thin">{errors.imagem.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="nome">Nome</Label>
                <input type="text" {...register('nome')} disabled={isLoading} id="nome" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Luca Gol" />
                {errors.nome && <p className="text-sm font-londrina text-danger font-thin">{errors.nome.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label>Presença</Label>
                <input type="checkbox" {...register('presenca')} disabled={isLoading} id="presenca" defaultChecked className="peer sr-only" />
                <Label htmlFor="presenca" className="h-6 w-12 bg-muted-foreground hover:bg-muted rounded-full transition-colors cursor-pointer flex items-center px-0.5 peer-checked:justify-end after:absolute after:size-5 after:bg-danger peer-checked:after:bg-primary after:rounded-full"/>
                {errors.presenca && <p className="text-sm font-londrina text-danger font-thin">{errors.presenca.message}</p>}
            </div>
            <Button className="w-full sm:w-fit" disabled={isLoading} type="submit">Entrar na lista</Button>
        </form>
    )
}