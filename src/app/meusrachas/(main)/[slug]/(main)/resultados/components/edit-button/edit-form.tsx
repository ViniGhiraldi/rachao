'use client'

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { Label } from "@/components/label";
import { useLoadingContext } from "@/contexts/loading-context";
import { IResultado } from "@/models/resultado";
import { ITime } from "@/models/time";
import { putResultado } from "@/services/api/resultados/put-resultado";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
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

interface ITimeForResultado extends Pick<ITime, 'id'>{}

interface IResultadoForForm extends Pick<IResultado, 'id' | 'timeCasaPontos' | 'timeVisitantePontos'>{
    timeCasa: ITimeForResultado;
    timeVisitante: ITimeForResultado;
}

interface ITimeForForm extends Pick<ITime, 'id' | 'nome'>{}

interface IEditForm{
    resultado: IResultadoForForm;
    closeForm: () => void;
    times: ITimeForForm[];
}

export const EditForm = ({resultado, times, closeForm}: IEditForm) => {
    const {register, handleSubmit, formState: { errors }} = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            timeCasaId: resultado.timeCasa.id,
            timeCasaPontos: resultado.timeCasaPontos,
            timeVisitanteId: resultado.timeVisitante.id,
            timeVisitantePontos: resultado.timeVisitantePontos
        }
    });
    const { isLoading, handleChangeIsLoading } = useLoadingContext();

    const handleEditResultado = async (data: Schema) => {
        handleChangeIsLoading(true);
        const result = await putResultado(resultado.id, data)
        closeForm();
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
        handleChangeIsLoading(false);
    }

    return (
        <Form.root onSubmit={handleSubmit(handleEditResultado)}>
            <Form.fieldContainer>
                <Label htmlFor="edit-timeCasaId">Time da casa</Label>
                <select {...register('timeCasaId')} disabled={isLoading} id="edit-timeCasaId" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg">
                    <option value="" disabled className="font-museo text-base">Selecione um time</option>
                    {times.map(time => (
                        <option value={time.id} selected={resultado.timeCasa.id === time.id} className="font-thin" key={`timeCasaId-${time.id}`}>{time.nome}</option>
                    ))}
                </select>
                {errors.timeCasaId && <Form.errorParagraph>{errors.timeCasaId.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor="edit-timeCasaPontos">Pontuação</Label>
                <input type="number" {...register('timeCasaPontos', {valueAsNumber: true})} disabled={isLoading} id="edit-timeCasaPontos" className="bg-transparent w-12 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0" />
                {errors.timeCasaPontos && <Form.errorParagraph>{errors.timeCasaPontos.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor="edit-timeVisitanteId">Time visitante</Label>
                <select {...register('timeVisitanteId')} disabled={isLoading} id="edit-timeVisitanteId" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg">
                    <option value="" disabled className="font-museo text-base">Selecione um time</option>
                    {times.map(time => (
                        <option value={time.id} selected={resultado.timeVisitante.id === time.id} className="font-thin" key={`timeVisitanteId-${time.id}`}>{time.nome}</option>
                    ))}
                </select>
                {errors.timeVisitanteId && <Form.errorParagraph>{errors.timeVisitanteId.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.fieldContainer>
                <Label htmlFor="edit-timeVisitantePontos">Pontuação</Label>
                <input type="number" {...register('timeVisitantePontos', {valueAsNumber: true})} disabled={isLoading} id="edit-timeVisitantePontos" className="bg-transparent w-12 outline-none font-museo font-thin text-base sm:text-2xl" placeholder="0" />
                {errors.timeVisitantePontos && <Form.errorParagraph>{errors.timeVisitantePontos.message}</Form.errorParagraph>}
            </Form.fieldContainer>
            <Form.buttonsContainer>
                <Button disabled={isLoading} type="submit">Adicionar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </Form.buttonsContainer>
        </Form.root>
    )
}