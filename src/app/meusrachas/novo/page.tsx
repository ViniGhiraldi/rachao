import Image from "next/image"
import { Form } from "./components/form"

export default function Novo() {
    return (
        <div className="flex justify-center relative p-3">
            <div className="absolute h-3/4 max-h-screen w-full pointer-events-none lg:w-4/5">
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0 bottom-0 rotate-90" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0 bottom-0 -rotate-90" width={200} height={200} />
            </div>
            <div className="sm:rounded-xl sm:border-4 w-full sm:w-96 border-primary">
                <div className="py-2 text-center bg-primary">
                    <h1 className="text-4xl text-white font-londrina">Crie seu Rachão</h1>
                </div>
                <Form />
            </div>
        </div>
    )
}