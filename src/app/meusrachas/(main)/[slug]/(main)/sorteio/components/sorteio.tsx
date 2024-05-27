'use client'

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { Divider } from "@/components/divider"
import { Paragraph } from "@/components/paragraph"
import { Status } from "@/components/status"
import { Toggle } from "@/components/toggle"
import { IJogador } from "@/models/jogador"
import { ITime } from "@/models/time"
import { Shield, UserRound } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface IResponseTime extends Pick<ITime, 'id' | 'createdAt' | 'imagem' | 'nome'> {
    _count: {
        jogadores: number;
        resultadosTimeVencedor: number;
    }
}

interface ISorteio {
    times: IResponseTime[];
    jogadores: IJogador[];
}

export const Sorteio = ({ jogadores, times }: ISorteio) => {
    const [apenasJogadoresSemTime, setApenasJogadoresSemTime] = useState(false);
    const [apenasJogadoresConfirmados, setApenasJogadoresConfirmados] = useState(false);
    const [jogadoresFiltered, setJogadoresFiltered] = useState<IJogador[]>(jogadores);

    useEffect(() => {
        if(apenasJogadoresSemTime && apenasJogadoresConfirmados){
            setJogadoresFiltered(oldValue => oldValue.filter(jogador => !jogador.time && jogador.presenca));
        }else if(apenasJogadoresSemTime){
            setJogadoresFiltered(oldValue => oldValue.filter(jogador => !jogador.time));
        }else if(apenasJogadoresConfirmados){
            setJogadoresFiltered(oldValue => oldValue.filter(jogador => jogador.presenca));
        }else{
            setJogadoresFiltered(jogadores);
        }
    }, [apenasJogadoresSemTime, apenasJogadoresConfirmados])

    return (
        <>
            <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-1">
                    <p>Apenas jogadores sem time</p>
                    <input type="checkbox" id="apenasJogadoresSemTime" className="peer sr-only" onChange={e => setApenasJogadoresSemTime(e.currentTarget.checked)} />
                    <Toggle htmlFor="apenasJogadoresSemTime" />
                </div>
                <div className="flex flex-col gap-1">
                    <p>Apenas jogadores confirmados</p>
                    <input type="checkbox" id="apenasJogadoresConfirmados" className="peer sr-only" onChange={e => setApenasJogadoresConfirmados(e.currentTarget.checked)} />
                    <Toggle htmlFor="apenasJogadoresConfirmados" />
                </div>
                <Button>Sortear</Button>
            </div>
            <Paragraph>Total de times: <span className="font-museo text-primary">{times.length}</span></Paragraph>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {times.map(time => (
                    <div className="max-w-full space-y-2 bg-white border shadow rounded-lg p-4" key={time.id}>
                        {time.imagem ? (
                            <Avatar src={time.imagem?.url} alt={time.nome} className="m-auto" />
                        ) : (
                            <Shield className="shrink-0 size-36 m-auto" />
                        )}
                        <Paragraph className="line-clamp-1 text-2xl">{time.nome}</Paragraph>
                    </div>
                ))}
            </div>
            <Divider />
            <Paragraph>Total de jogadores: <span className="font-museo text-primary">{jogadoresFiltered.length}</span></Paragraph>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {jogadoresFiltered.map(jogador => (
                    <div className="max-w-full bg-white border shadow rounded-lg p-4" key={jogador.id}>
                        {jogador.imagem ? (
                            <Avatar src={jogador.imagem?.url} alt={jogador.nome} className="m-auto" />
                        ) : (
                            <UserRound className="shrink-0 size-36 m-auto" />
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            <Status status={jogador.presenca} />
                            <Paragraph className="line-clamp-1 text-2xl">{jogador.nome}</Paragraph>
                        </div>
                        {jogador.time && <p className="font-light text-sm line-clamp-1">Time: <span className="font-kalam font-bold">{jogador.time.nome}</span></p>}
                    </div>
                ))}
            </div>
        </>
    )
}