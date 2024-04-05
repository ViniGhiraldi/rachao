'use client'

import { Button } from "@/components/button";
import { Label } from "@/components/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    nome: z.string().trim().min(1, 'Este campo é obrigatório.'),
    status: z.boolean(),
    imagem: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: "A imagem deve ter no máximo 10MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Apenas imagens são permitidas.",
    })
})

type Schema = z.infer<typeof schema>;

export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema)
    });

    const handleCreateJogador = async (data: Schema) => {
        console.log(data)
    }

    return (
        <form className="flex flex-col gap-4 font-museo" onSubmit={handleSubmit(handleCreateJogador)}>
            <input type="file" {...register('imagem')} id="imagem" className="sr-only" />
            <label htmlFor="imagem" className="size-40 border-4 border-dashed border-primary rounded-lg flex items-center justify-center text-muted text-center p-4 self-center">
                Clique para adicionar uma foto
            </label>
            {errors.imagem && <p className="text-sm font-londrina text-danger font-thin">{errors.imagem.message}</p>}
            <div className="flex flex-col gap-1">
                <Label htmlFor="nome">Nome</Label>
                <input type="text" {...register('nome')} id="nome" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Luca Gol" />
                {errors.nome && <p className="text-sm font-londrina text-danger font-thin">{errors.nome.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label>Presença</Label>
                <input type="checkbox" {...register('status')} id="presenca" className="peer sr-only" />
                <Label htmlFor="presenca" className="h-6 w-12 bg-muted-foreground hover:bg-muted rounded-full transition-colors cursor-pointer flex items-center px-0.5 peer-checked:justify-end after:absolute after:size-5 after:bg-primary after:rounded-full"></Label>
                {errors.status && <p className="text-sm font-londrina text-danger font-thin">{errors.status.message}</p>}
            </div>
            <Button className="w-full sm:w-fit" type="submit">Entrar na lista</Button>
        </form>
    )
}