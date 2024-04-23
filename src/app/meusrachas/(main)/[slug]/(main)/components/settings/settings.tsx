'use client'

import { Settings as SettingsIcon } from "lucide-react"
import { toast } from 'sonner';
import { useState } from "react"
import { Dropdown } from "@/components/dropdown";
import { deleteRachao } from "@/services/api/rachas/delete-rachao";
import { Modal } from "@/components/modal";
import { Divider } from "@/components/divider";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { EditForm } from "./edit-form";
import { IRachao } from "@/models/rachao";

interface ISettings{
    rachao: Pick<IRachao, 'id' | 'nome' | 'modalidade' | 'regras' | 'local' | 'diahora' | 'status'>;
}

export const Settings = ({rachao}: ISettings) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [modalDeleteRachaoIsOpen, setModalDeleteRachaoIsOpen] = useState(false);
    const [modalEditRachaoIsOpen, setModalEditRachaoIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleOnClickDropdown = () => {
        setDropdownIsOpen(current => !current);
    }

    const handleOnClickEditar = async () => {
        setDropdownIsOpen(false);
        setModalEditRachaoIsOpen(true);
    }

    const handleOnClickDeletarRachao = async () => {
        setDropdownIsOpen(false);
        setModalDeleteRachaoIsOpen(true);
    }

    const handleOnDelete = async () => {
        setIsLoading(true);
        const result = await deleteRachao(rachao.id);
        setModalDeleteRachaoIsOpen(false);
        if(!result){
            toast.success('Rachão deletado com sucesso!');
            router.replace('/meusrachas');
        }else{
            toast.error(result);
        }
        setIsLoading(false);
    }

    return(
        <div className="relative flex flex-col items-end md:items-center">
            <Button variant="outlined" icon onClick={handleOnClickDropdown}><SettingsIcon size={28}/></Button>
            <Dropdown.root isOpen={dropdownIsOpen}>
                <Dropdown.paragraph className="font-semibold">Configurações</Dropdown.paragraph>
                <Divider/>
                <button onClick={handleOnClickEditar}><Dropdown.paragraph>Editar</Dropdown.paragraph></button>
                <button onClick={handleOnClickDeletarRachao}><Dropdown.paragraph className="text-danger">Deletar Rachão</Dropdown.paragraph></button>
            </Dropdown.root>
            <Modal.root isOpen={modalEditRachaoIsOpen} handleOnClose={() => setModalEditRachaoIsOpen(false)}>
                <Modal.content className="text-left sm:w-96">
                    <h1>Editar</h1>
                    <Divider/>
                    <EditForm rachao={rachao} closeForm={() => setModalEditRachaoIsOpen(false)}/>
                </Modal.content>
            </Modal.root>
            <Modal.root isOpen={modalDeleteRachaoIsOpen} handleOnClose={() => setModalDeleteRachaoIsOpen(false)}>
                <Modal.content>
                    <Modal.attention/>
                    <Divider/>
                    <Modal.paragraph>Você deseja realmente deletar este rachão? Esta ação não poderá ser revertida.</Modal.paragraph>
                    <div className="self-start flex gap-3">
                        <Button variant="danger" disabled={isLoading} onClick={handleOnDelete}>Deletar</Button>
                        <Button variant="outlined" onClick={() => setModalDeleteRachaoIsOpen(false)}>Cancelar</Button>
                    </div>
                </Modal.content>
            </Modal.root>
        </div>
    )
}