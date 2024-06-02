'use client'

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Label } from "@/components/label";
import { useLoadingContext } from "@/contexts/loading-context";
import { IDespesa } from "@/models/despesa";
import { putDespesa } from "@/services/api/despesas/put-despesa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    titulo: z.string().trim().min(1, 'Este campo é obrigatório.'),
    quantidade: z.number({invalid_type_error: 'Este campo é obrigatório.'}).int({message: 'Apenas números inteiros são aceitos.'}).positive({message: 'O valor mínimo é 1.'}),
    custoUnitario: z.number({invalid_type_error: 'Este campo é obrigatório.'}).nonnegative({message: 'O valor deve ser maior que 0.'}).multipleOf(0.01, {message: 'O valor deve ter no máximo 2 casas decimais.'})
})

type Schema = z.infer<typeof schema>;

interface IEditForm{
    despesa: Pick<IDespesa, 'id' | 'titulo' | 'custoUnitario' | 'quantidade'>;
    closeForm: () => void;
}

export const EditForm = ({despesa, closeForm}: IEditForm) => {
    const {register, handleSubmit, formState: { errors }} = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            titulo: despesa.titulo,
            custoUnitario: despesa.custoUnitario,
            quantidade: despesa.quantidade
        }
    });
    const { isLoading, handleChangeIsLoading } = useLoadingContext();

    const handleEditDespesa = async (data: Schema) => {
        handleChangeIsLoading(true);
        const result = await putDespesa(despesa.id, data);
        closeForm();
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return (
        <Form.root onSubmit={handleSubmit(handleEditDespesa)}>
            <Form.fieldContainer>
                <Label htmlFor={`titulo-${despesa.id}`}>Título</Label>
                <input type="text" {...register('titulo')} disabled={isLoading} id={`titulo-${despesa.id}`} autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Aluguel do campo" />
                {errors.titulo && <Form.errorParagraph>{errors.titulo.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor={`quantidade-${despesa.id}`}>Quantidade</Label>
                <input type="number" disabled={isLoading} {...register('quantidade', {valueAsNumber: true})} id={`quantidade-${despesa.id}`} className="bg-transparent w-12 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0" />
                {errors.quantidade && <Form.errorParagraph>{errors.quantidade.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor={`custoUnitario-${despesa.id}`}>Custo Unitário</Label>
                <div className="flex gap-2 items-center">
                    <label htmlFor={`custoUnitario-${despesa.id}`} className="font-museo text-muted text-2xl">R$</label>
                    <input type="number" step="any" disabled={isLoading} {...register('custoUnitario', {valueAsNumber: true})} id={`custoUnitario-${despesa.id}`} className="bg-transparent w-20 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0,00" />
                </div>
                {errors.custoUnitario && <Form.errorParagraph>{errors.custoUnitario.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.buttonsContainer>
                <Button type="submit">Salvar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </Form.buttonsContainer>
        </Form.root>
    )
}