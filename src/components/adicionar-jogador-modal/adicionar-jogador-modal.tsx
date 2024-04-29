import { Modal } from "@/components/modal"
import { Divider } from "@/components/divider"
import { AdicionarJogadorForm } from "./adicionar-jogador-form";

interface IAdicionarJogadorModal {
    rachaoId: string;
    isOpen: boolean;
    handleOnClose: () => void;
}

export const AdicionarJogadorModal = ({ rachaoId, handleOnClose, isOpen }: IAdicionarJogadorModal) => {
    return (
        <Modal.root isOpen={isOpen} handleOnClose={handleOnClose}>
            <Modal.content className="text-left sm:w-96">
                <h1>Adicionar jogador</h1>
                <Divider />
                <AdicionarJogadorForm rachaoId={rachaoId} closeForm={handleOnClose} />
            </Modal.content>
        </Modal.root>
    )
}