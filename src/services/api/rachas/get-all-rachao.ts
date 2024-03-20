import { IRachao } from "@/models/rachao";

interface IResponseSuccess extends Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'diahora' | 'local' | 'status' | 'createdAt'>{
    _count: {
        jogadores: number;
    }
}[]

interface IResponseError {
    message: string;
}

export const getAllRachao = async () => {
    try {
        const response = await fetch('http://localhost:3333/rachao/all', {
            method: 'GET',
        })

        const { data } = await response.json() as {data: IResponseSuccess[] | IResponseError};

        if('message' in data){
            return;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
}