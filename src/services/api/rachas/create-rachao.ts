import { IRachao } from "@/models/rachao";

interface IBody extends Pick<IRachao, 'nome' | 'senha' | 'modalidade' | 'diahora' | 'local'>{}

interface IResponse extends Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local' | 'status'>{}

export const createRachao = async (body: IBody) => {
    try {
        const response = await fetch('http://localhost:3333/rachao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const { data } = await response.json() as {data: IResponse};

        return data;
    } catch (error) {
        console.log(error);
    }
}