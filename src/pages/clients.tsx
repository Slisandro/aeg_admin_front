import { useContext, useEffect, useState } from "react";
import ClientFormComponent from "../components/form-clients-component";
import ModalComponent from "../components/modal-component";
import TableComponent from "../components/table-component";
import { LanguageContext } from "../context/i18n-context";
import i18n from "../i18n/config";
import { useStore } from "../store";
import { useDeleteClient } from "../hooks/delete-client-hook";
import { useAllClients } from "../hooks/use-all-clients-hook";

export const ClientsPage = () => {
    const { } = useContext(LanguageContext);
    const { allClients } = useStore();
    const { mutate } = useDeleteClient();
    const { refetch: refectAllClients } = useAllClients();

    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(true);
    const [entity, setEntity] = useState();

    useEffect(() => {
        if (entity) {
            setModalEditOpen(true);
        }
    }, [entity])

    const toggleModalCreate = () => setModalCreateOpen(!isModalCreateOpen);
    const toggleModalEdit = () => {
        setModalEditOpen(!isModalEditOpen);
        setEntity(undefined)
    };
    const toggleDeleteItem = (id: string) => {
        if (id) {
            try {
                mutate({ id }, {
                    onSuccess: () => {
                        refectAllClients()
                    },
                    onError: (err) => {
                        console.error("Mutacion error:", err)
                    }
                });
            } catch (err) {
                console.error("Error:", err)
            }
        }
    }

    if (!allClients) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex flex-col items-start gap-0 justify-start">
            <div className="flex justify-end pb-4 px-4 w-full">
                <ModalComponent
                    isModalOpen={isModalCreateOpen}
                    toggleModal={toggleModalCreate}
                    children={<ClientFormComponent toggleModal={toggleModalCreate} />}
                    title={i18n.t("modules.clients.action.create")}
                    button={<button className="bg-[#2d68a2] font-bolder text-white rounded-md py-2 px-4 mx-4 shadow-lg">{i18n.t("table.action.create+")}</button>}
                />
            </div>
            <TableComponent
                columns={[
                    i18n.t("modules.clients.table.columns.id"),
                    i18n.t("modules.clients.table.columns.name"),
                    i18n.t("modules.clients.table.columns.representative"),
                    i18n.t("modules.clients.table.columns.code"),
                ]}
                columnsKey={["id", "name", "representative", "code"]}
                data={allClients}
                countPerPage={allClients.length}
                setEntity={setEntity}
                toggleDeleteItem={toggleDeleteItem}
            />
            {entity && (
                <ModalComponent
                    isModalOpen={isModalEditOpen}
                    toggleModal={toggleModalEdit}
                    children={<ClientFormComponent toggleModal={toggleModalEdit} entity={entity} />}
                    title={i18n.t("modules.clients.action.edit")}
                    button={<></>}
                />
            )}
        </div>
    )
} 