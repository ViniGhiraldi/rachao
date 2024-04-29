import { Divider } from "@/components/divider"
import { Modal } from "@/components/modal"
import { AdicionarDespesaForm } from "./adicionar-despesa-form"

interface IAdicionarDespesaModal {
    rachaoId: string;
    isOpen: boolean;
    handleOnClose: () => void;
}

export const AdicionarDespesaModal = ({ rachaoId, isOpen, handleOnClose }: IAdicionarDespesaModal) => {
    return (
        <Modal.root isOpen={isOpen} handleOnClose={handleOnClose}>
            <Modal.content className="text-left sm:w-96">
                <h1>Adicionar despesa</h1>
                <Divider />
                <AdicionarDespesaForm rachaoId={rachaoId} closeForm={handleOnClose} />
            </Modal.content>
        </Modal.root>
    )
}