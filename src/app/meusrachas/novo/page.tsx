import Image from "next/image"
import { Form } from "./components/form"

export default function Novo() {
    return (
        <div className="flex justify-center sm:my-4">
            <div className="w-full lg:w-4/5 flex justify-center relative">
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute left-0 bottom-0 rotate-90" width={200} height={200} />
                <Image src='/imgs/esquema-concept-2.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0" width={200} height={200} />
                <Image src='/imgs/esquema-concept-1.png' alt="Esquema de jogo" className="hidden lg:block absolute right-0 bottom-0 -rotate-90" width={200} height={200} />
                <div className="sm:rounded-xl sm:border-4 w-full sm:w-96 border-primary">
                    <div className="py-5 text-center bg-primary">
                        <h1 className="text-4xl text-white font-londrina">Crie seu Rachão</h1>
                    </div>
                    <Form/>
                </div>
            </div>
        </div>
    )
}