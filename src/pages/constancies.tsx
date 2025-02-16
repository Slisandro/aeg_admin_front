import { useContext, useEffect, useState } from "react";
import ConstancyFormComponent from "../components/form-constancies-component";
import ModalComponent from "../components/modal-component";
import TableComponent from "../components/table-component";
import i18n from "../i18n/config";
import { useStore } from "../store";
import { LanguageContext } from "../context/i18n-context";
import { useDeleteConstancy } from "../hooks/delete-constancy-hook";
import { useAllConstancies } from "../hooks/use-all-constancies-hook";

export const ConstanciesPage = () => {
    const { } = useContext(LanguageContext);
    const { allConstancies } = useStore();
    const { mutate } = useDeleteConstancy();
    const { refetch: refectAllConstancies } = useAllConstancies();
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
                        refectAllConstancies()
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

    if (!allConstancies) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex flex-col items-start gap-0 justify-start">
            <div className="flex justify-end pb-4 px-4 w-full">
                <ModalComponent
                    isModalOpen={isModalCreateOpen}
                    toggleModal={toggleModalCreate}
                    children={<ConstancyFormComponent toggleModal={toggleModalCreate} />}
                    title={i18n.t("modules.constancies.action.create")}
                    button={<button className="bg-[#2d68a2] font-bolder text-white rounded-md py-2 px-4 mx-4 shadow-lg">{i18n.t("table.action.create+")}</button>}
                />
            </div>
            <TableComponent
                setEntity={setEntity}
                toggleDeleteItem={toggleDeleteItem}
                columnsKey={[
                    "id",
                    "startDate",
                    "endDate",
                    "user.name",
                    "course.name",
                    "client.name"
                ]}
                columns={[
                    i18n.t("modules.constancies.table.columns.id"),
                    i18n.t("modules.constancies.table.columns.startDate"),
                    i18n.t("modules.constancies.table.columns.endDate"),
                    i18n.t("modules.constancies.table.columns.user.name"),
                    i18n.t("modules.constancies.table.columns.course.name"),
                    i18n.t("modules.constancies.table.columns.client.name"),
                ]}
                data={allConstancies}
                countPerPage={allConstancies.length}
            />
            {
                entity && (
                    <ModalComponent
                        isModalOpen={isModalEditOpen}
                        toggleModal={toggleModalEdit}
                        children={<ConstancyFormComponent toggleModal={toggleModalEdit} entity={entity} />}
                        title={i18n.t("modules.constancies.action.edit")}
                        button={<></>}
                    />
                )
            }
        </div>
    )
}