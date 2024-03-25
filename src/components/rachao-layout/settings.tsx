'use client'

import { Settings as SettingsIcon } from "lucide-react"
import { toast } from 'sonner';
import { useState } from "react"
import { Dropdown } from "../dropdown";
import { deleteRachao } from "@/services/api/rachas/delete-rachao";
import { Modal } from "../modal";
import { Divider } from "../divider";
import { Button } from "../button";
import { useRouter } from "next/navigation";

interface ISettings{
    rachaoId: string;
}

export const Settings = ({rachaoId}: ISettings) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const router = useRouter();

    const handleOnClickDropdown = () => {
        setDropdownIsOpen(current => !current);
    }

    const handleOnClickDeletarRachao = async () => {
        setModalIsOpen(true);
    }

    const handleOnCloseModal = () => {
        setModalIsOpen(false);
    }

    const handleOnDelete = async () => {
        const result = await deleteRachao(rachaoId);
        handleOnCloseModal();
        if(result === 'Rachão deletado com sucesso!'){
            toast.success(result);
            router.replace('/meusrachas');
        }else{
            toast.error(result);
        }
    }

    return(
        <div className="relative flex flex-col items-center">
            <button onClick={handleOnClickDropdown}><SettingsIcon size={28}/></button>
            <Dropdown.root isOpen={dropdownIsOpen} className="top-8">
                <button onClick={handleOnClickDeletarRachao}><Dropdown.paragraph>Deletar Rachão</Dropdown.paragraph></button>
            </Dropdown.root>
            <Modal.root isOpen={modalIsOpen} handleOnClose={handleOnCloseModal}>
                <Modal.content>
                    <Modal.attention/>
                    <Divider/>
                    <Modal.paragraph>Você deseja realmente deletar este rachão? Esta ação não poderá ser revertida.</Modal.paragraph>
                    <div className="self-start flex gap-3">
                        <Button variant="danger" onClick={handleOnDelete}>Deletar</Button>
                        <Button variant="outlined" onClick={handleOnCloseModal}>Cancelar</Button>
                    </div>
                </Modal.content>
            </Modal.root>
        </div>
    )
}