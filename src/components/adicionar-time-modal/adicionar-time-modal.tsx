import { Modal } from "@/components/modal"
import { Divider } from "@/components/divider"
import { AdicionarTimeForm } from "./adicionar-time-form";

interface IAdicionarTimeModal {
    rachaoId: string;
    isOpen: boolean;
    handleOnClose: () => void;
}

export const AdicionarTimeModal = ({ rachaoId, handleOnClose, isOpen }: IAdicionarTimeModal) => {
    return (
        <Modal.root isOpen={isOpen} handleOnClose={handleOnClose}>
            <Modal.content className="text-left sm:w-96">
                <h1>Adicionar time</h1>
                <Divider />
                <AdicionarTimeForm rachaoId={rachaoId} closeForm={handleOnClose} />
            </Modal.content>
        </Modal.root>
    )
}