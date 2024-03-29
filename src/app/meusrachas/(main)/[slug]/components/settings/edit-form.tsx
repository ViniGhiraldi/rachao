'use client'

import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { IRachao } from "@/models/rachao";
import { putRachao } from "@/services/api/rachas/put-rachao";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    nome: z.string().trim().min(1, 'Este campo é obrigatório.'),
    modalidade: z.string().trim().min(1, 'Este campo é obrigatório.'),
    local: z.string().trim().min(1, 'Este campo é obrigatório.'),
    diahora: z.coerce.date().min(new Date(), 'A data deve ser válida.'),
    regras: z.string().optional()
})

type Schema = z.infer<typeof schema>;

interface IEditForm{
    rachao: Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'regras' | 'local' | 'diahora' | 'status'>
    closeForm: () => void;
}

export const EditForm = ({rachao, closeForm}: IEditForm) => {
    const {register, handleSubmit, formState: { errors }} = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: rachao.nome,
            modalidade: rachao.modalidade,
            regras: rachao.regras || undefined,
            local: rachao.local,
            diahora: (rachao.diahora as unknown as string).split('.')[0] as unknown as Date
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleEditRachao = async (data: Schema) => {
        setIsLoading(true);
        const result = await putRachao(rachao.id, {...data, status: rachao.status})
        closeForm();
        if(result === 'As alterações foram salvas!'){
            toast.success(result);
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return (
        <form className="space-y-3 w-full" onSubmit={handleSubmit(handleEditRachao)}>
            <div className="flex flex-col gap-1">
                <Label htmlFor="nome">Apelido do racha</Label>
                <input type="text" disabled={isLoading} {...register('nome')} id="nome" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Racha do Pedrão" />
                {errors.nome && <p className="text-sm font-londrina text-danger font-thin">{errors.nome.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="modalidade">Modalidade</Label>
                <input type="text" disabled={isLoading} {...register('modalidade')} id="modalidade" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Futebol" />
                {errors.modalidade && <p className="text-sm font-londrina text-danger font-thin">{errors.modalidade.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="regras">Regras</Label>
                <input type="text" disabled={isLoading} {...register('regras')} id="regras" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: 10 minutos por jogo" />
                {errors.regras && <p className="text-sm font-londrina text-danger font-thin">{errors.regras.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="local">Local</Label>
                <input type="text" disabled={isLoading}  {...register('local')} id="local" autoComplete="off" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" placeholder="Ex.: Ginásio local, Rua D. Pedro" />
                {errors.local && <p className="text-sm font-londrina text-danger font-thin">{errors.local.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Label htmlFor="diahora">Dia e Horário</Label>
                <input type="datetime-local" disabled={isLoading} {...register('diahora')} id="diahora" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-base sm:text-lg" />
                {errors.diahora && <p className="text-sm font-londrina text-danger font-thin">{errors.diahora.message}</p>}
            </div>

            <div className="self-start flex gap-3">
                <Button disabled={isLoading} type="submit">Salvar</Button>
                <Button variant="outlined" onClick={closeForm} type="button">Cancelar</Button>
            </div>
        </form>
    )
}