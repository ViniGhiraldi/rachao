'use client'

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Label } from "@/components/label";
import { useLoadingContext } from "@/contexts/loading-context";
import { ITime } from "@/models/time";
import { putTime } from "@/services/api/times/put-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form"
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

interface IEditForm{
    time: Pick<ITime, 'id' | 'nome' | 'imagem'>;
    closeForm: () => void;
}

export const EditForm = ({time, closeForm}: IEditForm) => {
    const {register, handleSubmit, formState: { errors }} = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: time.nome,
        }
    });
    const { isLoading, handleChangeIsLoading } = useLoadingContext();
    
    const [imagem, setImagem] = useState<File | null | undefined | string>(time.imagem?.url);

    const handleEditTime = async (data: Schema) => {
        handleChangeIsLoading(true);
        const result = await putTime(time.id, data);
        closeForm();
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    const handleDeleteImage = async () => {
        if(!time.imagem) {
            toast.info('O time não possui imagem.');
            return;
        }
        handleChangeIsLoading(true);
        const result = await putTime(time.id, {}, {deleteImagem: true});
        closeForm();
        if(result === 'As alterações foram salvas!'){
            setImagem(null);
            toast.success(result);
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return (
        <Form.root encType="multipart/form-data" onSubmit={handleSubmit(handleEditTime)}>
            <Form.fieldContainer className="relative">
                <input type="file" {...register('imagem')} disabled={isLoading} onChange={e => setImagem(e.currentTarget.files?.item(0))} id={`imagem-${time.id}`} className="sr-only" />
                <Form.imageArea htmlFor={`imagem-${time.id}`}>
                    {imagem ? <Form.image src={typeof imagem === 'string' ? imagem : URL.createObjectURL(imagem)}/> : <Form.textImage>Clique para adicionar uma imagem</Form.textImage>}
                </Form.imageArea>
                <Button className="absolute right-0 bottom-0" variant="outlined" icon type="button" onClick={handleDeleteImage}>
                    <Trash2 className="text-danger" size={28}/>
                </Button>
                {errors.imagem && <Form.errorParagraph>{errors.imagem.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor={`nome-${time.id}`}>Nome</Label>
                <input type="text" disabled={isLoading} {...register('nome')} id={`nome-${time.id}`} autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Nome do time" />
                {errors.nome && <Form.errorParagraph>{errors.nome.message}</Form.errorParagraph>}
            </Form.fieldContainer>

            <Form.buttonsContainer>
                <Button type="submit">Salvar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </Form.buttonsContainer>
        </Form.root>
    )
}