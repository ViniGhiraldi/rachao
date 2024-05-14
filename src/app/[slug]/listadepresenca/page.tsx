import { Divider } from "@/components/divider";
import { getRachao } from "@/services/api/rachas/get-rachao"
import { UserRound } from "lucide-react";
import Image from "next/image";
import { Form } from "./components/form";
import { RachaoLayout } from "@/components/rachao-layout";
import { getAllJogadores } from "@/services/api/jogadores/get-all-jogadores";
import { Avatar } from "@/components/avatar";

export default async function ListaDePresenca({ params }: { params: { slug: string } }) {
    const rachao = await getRachao(params.slug);
    const jogadores = await getAllJogadores(params.slug);

    if (typeof rachao === "string") return <RachaoLayout.message className="m-5 md:m-20">{rachao || "Rachão não encontrado ou existente!"}</RachaoLayout.message>

    if (!rachao.status) return <RachaoLayout.message className="m-5 md:m-20">Este rachão está fechado!</RachaoLayout.message>

    return (
        <div className="flex justify-center p-3 relative">
            <div className="absolute h-3/4 max-h-screen w-full lg:w-4/5 pointer-events-none">
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0 bottom-0 rotate-90" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0 bottom-0 -rotate-90" width={200} height={200} />
            </div>
            <div className="w-full sm:w-96 space-y-3 md:space-y-4 pb-3 font-londrina">
                <h1 className="text-4xl text-center text-primary">{rachao.nome}</h1>
                <Divider />
                <Form rachaoId={rachao.id}/>
                {typeof jogadores === 'object' && (
                    <>
                        <Divider />
                        <p className="text-2xl font-light">Quem já está dentro</p>
                        <div className="space-y-3">
                            {jogadores.map((jogador, i) => (
                                <div className="flex gap-4 items-center" key={i}>
                                    {jogador.imagem ? (
                                        <Avatar src={jogador.imagem?.url} alt={jogador.nome} className="size-16" />
                                    ) : (
                                        <UserRound className="size-16 shrink-0" />
                                    )}
                                    <span className="font-kalam text-2xl line-clamp-2">{jogador.nome}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}