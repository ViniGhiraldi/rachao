'use client'

import { Button } from "@/components/button";
import { Form as ComponentForm } from "@/components/form";
import { Label } from "@/components/label";
import { useLoadingContext } from "@/contexts/loading-context";
import { ITime } from "@/models/time";
import { createResultado } from "@/services/api/resultados/create-resultado";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    timeCasaId: z.string().trim().cuid({message: 'Selecione um time.'}).min(1, 'Este campo é obrigatório.'),
    timeVisitanteId: z.string().trim().cuid({message: 'Selecione um time.'}).min(1, 'Este campo é obrigatório.'),
    timeVisitantePontos: z.number({invalid_type_error: 'Este campo é obrigatório.'}).int({message: 'Apenas números inteiros são aceitos.'}).nonnegative({message: 'A pontuação não pode ser negativa.'}),
    timeCasaPontos: z.number({invalid_type_error: 'Este campo é obrigatório.'}).int({message: 'Apenas números inteiros são aceitos.'}).nonnegative({message: 'A pontuação não pode ser negativa.'})
}).superRefine((values, ctx) => {
    if(values.timeCasaId === values.timeVisitanteId){
        ctx.addIssue({
            path: ['timeVisitanteId'],
            code: z.ZodIssueCode.custom,
            message: 'Os times não podem ser o mesmo.'
        })
    }
})

type Schema = z.infer<typeof schema>;

interface ITimeForForm extends Pick<ITime, 'id' | 'nome'>{}

interface IForm{
    rachaoId: string;
    closeForm: () => void;
    times: ITimeForForm[]
}

export const CreateForm = ({rachaoId, closeForm, times}: IForm) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            timeCasaPontos: 0,
            timeVisitantePontos: 0
        }
    });
    const { isLoading, handleChangeIsLoading } = useLoadingContext();

    const handleCreateResultado = async (data: Schema) => {
        handleChangeIsLoading(true);
        const result = await createResultado(rachaoId, data);
        if(typeof result === 'object'){
            toast.success(`Resultado adicionado com sucesso!`);
            reset();
            closeForm();
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return(
        <ComponentForm.root onSubmit={handleSubmit(handleCreateResultado)}>
            <ComponentForm.fieldContainer>
                <Label htmlFor="timeCasaId">Time da casa</Label>
                <select {...register('timeCasaId')} disabled={isLoading} id="timeCasaId" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg">
                    <option value="" disabled selected className="font-museo text-base">Selecione um time</option>
                    {times.map(time => (
                        <option value={time.id} className="font-thin" key={`timeCasaId-${time.id}`}>{time.nome}</option>
                    ))}
                </select>
                {errors.timeCasaId && <ComponentForm.errorParagraph>{errors.timeCasaId.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.fieldContainer>
                <Label htmlFor="timeCasaPontos">Pontuação</Label>
                <input type="number" {...register('timeCasaPontos', {valueAsNumber: true})} disabled={isLoading} id="timeCasaPontos" className="bg-transparent w-12 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0" />
                {errors.timeCasaPontos && <ComponentForm.errorParagraph>{errors.timeCasaPontos.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.fieldContainer>
                <Label htmlFor="timeVisitanteId">Time visitante</Label>
                <select {...register('timeVisitanteId')} disabled={isLoading} id="timeVisitanteId" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg">
                    <option value="" disabled selected className="font-museo text-base">Selecione um time</option>
                    {times.map(time => (
                        <option value={time.id} className="font-thin" key={`timeVisitanteId-${time.id}`}>{time.nome}</option>
                    ))}
                </select>
                {errors.timeVisitanteId && <ComponentForm.errorParagraph>{errors.timeVisitanteId.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.fieldContainer>
                <Label htmlFor="timeVisitantePontos">Pontuação</Label>
                <input type="number" {...register('timeVisitantePontos', {valueAsNumber: true})} disabled={isLoading} id="timeVisitantePontos" className="bg-transparent w-12 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0" />
                {errors.timeVisitantePontos && <ComponentForm.errorParagraph>{errors.timeVisitantePontos.message}</ComponentForm.errorParagraph>}
            </ComponentForm.fieldContainer>
            <ComponentForm.buttonsContainer>
                <Button disabled={isLoading} type="submit">Adicionar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </ComponentForm.buttonsContainer>
        </ComponentForm.root>
    )
}