export default function Novo(){
    return(
        <div className="flex justify-center mt-10">
            <div className="rounded-xl border-4 w-96 border-primary">
                <div className="py-5 text-center bg-primary">
                    <h1 className="text-4xl text-white font-londrina">Crie seu Rachão</h1>
                </div>
                <div className="p-4 space-y-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nome" className="font-semibold text-primary text-xl">Apelido do racha</label>
                        <input id="nome" type="text" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Racha do Pedrão" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="modalidade" className="font-semibold text-primary text-xl">Modalidade</label>
                        <select id="modalidade" className="border-2 border-muted font-londrina p-2 rounded-lg font-thin text-lg">
                            <option value="futebol">Futebol</option>
                            <option value="basquete">Basquete</option>
                            <option value="vôlei">Vôlei</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="local" className="font-semibold text-primary text-xl">Local</label>
                        <input id="local" type="text" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Ex.: Ginásio local, Rua D. Pedro" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="diahora" className="font-semibold text-primary text-xl">Dia e Horário</label>
                        <input id="diahora" type="datetime-local" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="senha" className="font-semibold text-primary text-xl">Senha</label>
                        <input id="senha" type="text" className="border-2 border-muted font-londrina font-thin w-full p-2 rounded-lg text-lg" placeholder="Pelo menos 5 dígitos" />
                    </div>
                    <p className="text-xs text-danger leading-4">Obs.: A senha serve para que ninguém além de quem você quiser tenha acesso de administrador</p>
                </div>
            </div>
        </div>
    )
}