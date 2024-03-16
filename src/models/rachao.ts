export interface IRachao{
    id: string;
    nome: string;
    senha: string;
    modalidade: string;
    diahora: Date;
    local: string;
    regras?: string;
    status: boolean;
    custoTotal: number;
    custoPessoa: number;
    createdAt: Date;
}