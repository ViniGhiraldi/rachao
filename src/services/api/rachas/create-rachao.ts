import { IRachao } from "@/models/rachao";

export const createRachao = async (data: Pick<IRachao, 'nome' | 'senha' | 'modalidade' | 'diahora' | 'local' | 'regras' | 'status'>) => {
    try {
        const response = await fetch('http://localhost:3333/rachao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
        })

        const result = response.json();

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}