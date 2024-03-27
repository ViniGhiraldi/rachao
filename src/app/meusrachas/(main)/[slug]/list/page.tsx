import { getRachao } from "@/services/api/rachas/get-rachao"

export default async function List({params}: {params: {slug: string}}){
    const rachao = await getRachao(params.slug);

    if(typeof rachao === 'string' || !rachao) return <h1 className="text-xl">{rachao || "Rachão não encontrado ou existente!"}</h1>

    return(
        <h1>{rachao.nome}</h1>
    )
}