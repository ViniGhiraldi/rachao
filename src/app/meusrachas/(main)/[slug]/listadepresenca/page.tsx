import { Divider } from "@/components/divider";
import { getRachao } from "@/services/api/rachas/get-rachao"
import { UserRound } from "lucide-react";
import Image from "next/image";
import { Form } from "./components/form";

export default async function ListaDePresenca({params}: {params: {slug: string}}){
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string' || !rachao) return <h1 className="text-xl">{rachao || "Rachão não encontrado ou existente!"}</h1>

    return(
        <div className="flex justify-center">
            <div className="flex w-full lg:w-4/5 justify-center relative ">
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0 bottom-0 rotate-90" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0 bottom-0 -rotate-90" width={200} height={200} />
                <div className="w-full sm:w-96 space-y-3 md:space-y-4 font-londrina">
                    <h1 className="text-4xl text-center text-primary">{rachao.nome}</h1>
                    <Divider/>
                    <Form/>
                    <Divider/>
                    {rachao.jogadores.length > 0 && (
                        <>
                            <p className="text-2xl font-light">Quem já está dentro</p>
                            <div className="space-y-3">
                                {rachao.jogadores.map((jogador, i) => (
                                    <div className="flex gap-4 items-center" key={i}>
                                        {jogador.imagem ? (
                                            <img src={jogador.imagem?.url} alt={jogador.nome} className="size-16 rounded-md aspect-square object-cover" />
                                        ) : (
                                            <UserRound className="size-16 border-2 border-primary rounded-md"/>
                                        )}
                                        <span className="font-kalam text-2xl">{jogador.nome}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}