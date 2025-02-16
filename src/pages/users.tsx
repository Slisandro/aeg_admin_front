import { useContext, useEffect, useState } from "react";
import UserFormComponent from "../components/form-users-component";
import ModalComponent from "../components/modal-component";
import TableComponent from "../components/table-component";
import { LanguageContext } from "../context/i18n-context";
import i18n from "../i18n/config";
import { useStore } from "../store";
import { useDeleteUser } from "../hooks/delete-user-hook";
import { useAllUsers } from "../hooks/use-all-users-hook";

export const UsersPage = () => {
    const { } = useContext(LanguageContext);
    const { allUsers } = useStore();
    const { mutate } = useDeleteUser();
    const { refetch: refectAllUsers } = useAllUsers();
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
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
                        refectAllUsers()
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

    if (!allUsers) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex flex-col items-start gap-0 justify-start">
            <div className="flex justify-end pb-4 px-4 w-full">
                <ModalComponent
                    isModalOpen={isModalCreateOpen}
                    toggleModal={toggleModalCreate}
                    children={<UserFormComponent toggleModal={toggleModalCreate} />}
                    title={i18n.t("modules.users.action.create")}
                    button={<button className="bg-[#2d68a2] font-bolder text-white rounded-md py-2 px-4 mx-4 shadow-lg">{i18n.t("table.action.create+")}</button>}
                />
            </div>
            <TableComponent
                setEntity={setEntity}
                columnsKey={[
                    "id",
                    "name",
                    "email",
                    "role"
                ]}
                columns={[
                    i18n.t("modules.users.table.columns.id"),
                    i18n.t("modules.users.table.columns.name"),
                    i18n.t("modules.users.table.columns.email"),
                    i18n.t("modules.users.table.columns.role"),
                ]}
                data={allUsers}
                countPerPage={allUsers.length}
                toggleDeleteItem={toggleDeleteItem}
            />
            <ModalComponent
                isModalOpen={isModalEditOpen}
                toggleModal={toggleModalEdit}
                children={<UserFormComponent toggleModal={toggleModalEdit} entity={entity} />}
                title={i18n.t("modules.users.action.edit")}
                button={<></>}
            />
        </div>
    )
}