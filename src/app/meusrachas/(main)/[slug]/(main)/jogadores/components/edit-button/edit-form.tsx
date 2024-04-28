'use client'

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Label } from "@/components/label";
import { Toggle } from "@/components/toggle";
import { IJogador } from "@/models/jogador";
import { putJogador } from "@/services/api/jogadores/put-jogador";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
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
    const {register, handleSubmit, formState: { errors }} = useForm<Schema>({
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

    const handleDeleteImage = async () => {
        if(!jogador.imagem) {
            toast.info('O jogador não possui imagem.');
            return;
        }
        setIsLoading(true);
        const result = await putJogador(jogador.id, {}, {deleteImagem: true});
        closeForm();
        if(result === 'As alterações foram salvas!'){
            setImagem(null);
            toast.success(result);
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return (
        <Form.root encType="multipart/form-data" onSubmit={handleSubmit(handleEditJogador)}>
            <Form.fieldContainer className="relative">
                <input type="file" {...register('imagem')} disabled={isLoading} onChange={e => setImagem(e.currentTarget.files?.item(0))} id={`imagem-${jogador.id}`} className="sr-only" />
                <Form.imageArea htmlFor={`imagem-${jogador.id}`}>
                    {imagem ? <Form.image src={typeof imagem === 'string' ? imagem : URL.createObjectURL(imagem)}/> : <Form.textImage>Clique para adicionar uma imagem</Form.textImage>}
                </Form.imageArea>
                <Button className="absolute right-0 bottom-0" variant="outlined" icon type="button" onClick={handleDeleteImage}>
                    <Trash2 className="text-danger" size={28}/>
                </Button>
                {errors.imagem && <Form.errorParagraph>{errors.imagem.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor={`nome-${jogador.id}`}>Nome</Label>
                <input type="text" disabled={isLoading} {...register('nome')} id={`nome-${jogador.id}`} autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Nome do jogador" />
                {errors.nome && <Form.errorParagraph>{errors.nome.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor={`presenca-${jogador.id}`}>Presença</Label>
                <input type="checkbox" {...register('presenca')} disabled={isLoading} id={`presenca-${jogador.id}`} className="peer sr-only" />
                <Toggle htmlFor={`presenca-${jogador.id}`}/>
                {errors.presenca && <Form.errorParagraph>{errors.presenca.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor={`nota-${jogador.id}`}>Nota</Label>
                <input type="number" step="any" disabled={isLoading} {...register('nota', {valueAsNumber: true})} id={`nota-${jogador.id}`} className="bg-transparent w-20 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0,00" />
                {errors.nota && <Form.errorParagraph>{errors.nota.message}</Form.errorParagraph>}
            </Form.fieldContainer>

            <Form.buttonsContainer>
                <Button disabled={isLoading} type="submit">Salvar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </Form.buttonsContainer>
        </Form.root>
    )
}