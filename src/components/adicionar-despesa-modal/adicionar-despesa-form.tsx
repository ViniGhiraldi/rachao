'use client'

import { Button } from "@/components/button";
import { Form as ComponentForm } from "@/components/form";
import { Label } from "@/components/label";
import { useLoadingContext } from "@/contexts/loading-context";
import { createDespesa } from "@/services/api/despesas/create-despesa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    titulo: z.string().trim().min(1, 'Este campo é obrigatório.'),
    quantidade: z.number({invalid_type_error: 'Este campo é obrigatório.'}).int({message: 'Apenas números inteiros são aceitos.'}).positive({message: 'O valor mínimo é 1.'}),
    custoUnitario: z.number({invalid_type_error: 'Este campo é obrigatório.'}).nonnegative({message: 'O valor deve ser maior que 0.'}).multipleOf(0.01, {message: 'O valor deve ter no máximo 2 casas decimais.'})
})

type Schema = z.infer<typeof schema>;

interface IForm{
    rachaoId: string;
    closeForm: () => void;
}

export const AdicionarDespesaForm = ({rachaoId, closeForm}: IForm) => {
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            quantidade: 1
        }
    });
    const { isLoading, handleChangeIsLoading } = useLoadingContext();

    const handleCreateJogador = async (data: Schema) => {
        handleChangeIsLoading(true);
        const result = await createDespesa(rachaoId, data);
        if(typeof result === 'object'){
            toast.success(`Despesa adicionada com sucesso!`);
            reset();
            closeForm();
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return(
        <ComponentForm.root onSubmit={handleSubmit(handleCreateJogador)}>
            <ComponentForm.fieldContainer>
                <Label htmlFor="titulo">Título</Label>
                <input type="text" {...register('titulo')} disabled={isLoading} id="titulo" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Aluguel do campo" />
                {errors.titulo && <ComponentForm.errorParagraph>{errors.titulo.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.fieldContainer>
                <Label htmlFor="quantidade">Quantidade</Label>
                <input type="number" disabled={isLoading} {...register('quantidade', {valueAsNumber: true})} id="quantidade" className="bg-transparent w-12 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0" />
                {errors.quantidade && <ComponentForm.errorParagraph>{errors.quantidade.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.fieldContainer>
                <Label htmlFor="custoUnitario">Custo Unitário</Label>
                <div className="flex gap-2 items-center">
                    <label htmlFor="custoUnitario" className="font-museo text-muted text-2xl">R$</label>
                    <input type="number" step="any" disabled={isLoading} {...register('custoUnitario', {valueAsNumber: true})} id="custoUnitario" className="bg-transparent w-20 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0,00" />
                </div>
                {errors.custoUnitario && <ComponentForm.errorParagraph>{errors.custoUnitario.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.buttonsContainer>
                <Button disabled={isLoading} type="submit">Adicionar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </ComponentForm.buttonsContainer>
        </ComponentForm.root>
    )
}