import { IRachao } from "@/models/rachao";

interface IData extends Pick<IRachao, 'nome' | 'senha' | 'modalidade' | 'diahora' | 'local'>{}

interface IResponse extends Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local' | 'status'>{}

export const createRachao = async (data: IData) => {
    try {
        const response = await fetch('http://localhost:3333/rachao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json() as IResponse;

        console.log(result);

        return result;
    } catch (error) {
        console.log(error);
    }
}