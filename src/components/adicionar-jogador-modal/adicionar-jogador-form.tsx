'use client'

import { Button } from "@/components/button";
import { Form as ComponentForm } from "@/components/form";
import { Label } from "@/components/label";
import { Toggle } from "@/components/toggle";
import { useLoadingContext } from "@/contexts/loading-context";
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
    closeForm: () => void;
}

export const AdicionarJogadorForm = ({rachaoId, closeForm}: IForm) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema)
    });
    const { isLoading, handleChangeIsLoading } = useLoadingContext();
    
    const [imagem, setImagem] = useState<File | null>();

    const handleCreateJogador = async (data: Schema) => {
        handleChangeIsLoading(true);
        const result = await createJogador(rachaoId, data);
        if(typeof result === 'object'){
            toast.success(`${result.nome} entrou pra lista!`);
            reset();
            setImagem(null);
            closeForm();
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return(
        <ComponentForm.root encType="multipart/form-data" onSubmit={handleSubmit(handleCreateJogador)}>
            <ComponentForm.fieldContainer>
                <input type="file" {...register('imagem')} disabled={isLoading} onChange={e => setImagem(e.currentTarget.files?.item(0))} id="imagem" className="sr-only" />
                <ComponentForm.imageArea htmlFor="imagem">
                    {imagem ? <ComponentForm.image src={URL.createObjectURL(imagem)}/> : <ComponentForm.textImage>Clique para adicionar uma imagem</ComponentForm.textImage>}
                </ComponentForm.imageArea>
                {errors.imagem && <ComponentForm.errorParagraph>{errors.imagem.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.fieldContainer>
                <Label htmlFor="nomejogador">Nome</Label>
                <input type="text" {...register('nome')} disabled={isLoading} id="nomejogador" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Luca Gol" />
                {errors.nome && <ComponentForm.errorParagraph>{errors.nome.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.fieldContainer>
                <Label htmlFor="presenca">Presença</Label>
                <input type="checkbox" {...register('presenca')} disabled={isLoading} id="presenca" defaultChecked className="peer sr-only" />
                <Toggle htmlFor="presenca"/>
                {errors.presenca && <ComponentForm.errorParagraph>{errors.presenca.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.buttonsContainer>
                <Button disabled={isLoading} type="submit">Adicionar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </ComponentForm.buttonsContainer>
        </ComponentForm.root>
    )
}