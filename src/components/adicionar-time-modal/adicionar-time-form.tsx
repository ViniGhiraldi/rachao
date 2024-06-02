'use client'

import { Button } from "@/components/button";
import { Form as ComponentForm } from "@/components/form";
import { Label } from "@/components/label";
import { useLoadingContext } from "@/contexts/loading-context";
import { createTime } from "@/services/api/times/create-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    nome: z.string().trim().min(1, 'Este campo é obrigatório.'),
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

export const AdicionarTimeForm = ({rachaoId, closeForm}: IForm) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema)
    });
    const { isLoading, handleChangeIsLoading } = useLoadingContext();

    const [imagem, setImagem] = useState<File | null>();

    const handleCreateJogador = async (data: Schema) => {
        handleChangeIsLoading(true);
        const result = await createTime(rachaoId, data);
        if(typeof result === 'object'){
            toast.success(`${result.nome} adicionado com sucesso!`);
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
                <Label htmlFor="nometime">Nome</Label>
                <input type="text" {...register('nome')} disabled={isLoading} id="nometime" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Rachão FC" />
                {errors.nome && <ComponentForm.errorParagraph>{errors.nome.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.buttonsContainer>
                <Button disabled={isLoading} type="submit">Adicionar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </ComponentForm.buttonsContainer>
        </ComponentForm.root>
    )
}