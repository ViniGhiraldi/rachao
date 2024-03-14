import Link from "next/link";

export default function Meusrachoes() {
    return(
        <div className="">
            <div className="flex justify-between items-end font-londrina">
                <h1 className="text-5xl font-medium">Meus rachas</h1>
                <Link href='/' className="text-3xl hover:underline"><span className="text-lime-400">+</span> Criar rachão</Link>
            </div>
            <div className="h-px w-ful border border-zinc-400 mt-7" />
            <div className="grid grid-cols-4 mt-7 gap-10">
                <div className="border-4 border-lime-400 p-6 rounded-xl font-londrina bg-black/40">
                    <h1 className="text-3xl font-medium text-center text-lime-400">Racha do Pedrão</h1>
                    <div className="mt-7 text-xl font-light text-white">
                        <p className="">Modalidade: <span className="font-kalam">Futebol</span></p>
                        <p className="">Local: <span className="font-kalam">Ginásio local, Rua...</span></p>
                        <p className="">Data: <span className="font-kalam">05/03/2024 - 18:00</span></p>
                        <p className="">Confirmados: <span className="font-kalam">26</span></p>
                        <p className="">Status: <span className="font-kalam text-lime-400">Em aberto</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}