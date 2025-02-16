import { useContext, useEffect, useState } from "react";
import CourseFormComponent from "../components/form-courses-component";
import ModalComponent from "../components/modal-component";
import TableComponent from "../components/table-component";
import { LanguageContext } from "../context/i18n-context";
import i18n from "../i18n/config";
import { useStore } from "../store";
import { useDeleteCourse } from "../hooks/delete-course-hook";
import { useAllCourses } from "../hooks/use-all-courses-hook";

export const CoursesPage = () => {
    const { } = useContext(LanguageContext);
    const { allCourses } = useStore();
    const { mutate } = useDeleteCourse();
    const { refetch: refectAllCourses } = useAllCourses();
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
                        refectAllCourses()
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

    if (!allCourses) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex flex-col items-start gap-0 justify-start">
            <div className="flex justify-end pb-4 px-2 w-full">
                <ModalComponent
                    isModalOpen={isModalCreateOpen}
                    toggleModal={toggleModalCreate}
                    children={<CourseFormComponent toggleModal={toggleModalCreate} />}
                    title={i18n.t("modules.courses.action.create")}
                    button={<button className="bg-[#2d68a2] font-bolder text-white rounded-md py-2 px-4  shadow-lg">{i18n.t("table.action.create+")}</button>}
                />
            </div>
            <TableComponent
                setEntity={setEntity}
                toggleDeleteItem={toggleDeleteItem}
                columnsKey={[
                    "id",
                    "name",
                    "duration"
                ]}
                columns={[
                    i18n.t("modules.courses.table.columns.id"),
                    i18n.t("modules.courses.table.columns.name"),
                    i18n.t("modules.courses.table.columns.duration"),
                ]}
                data={allCourses}
                countPerPage={allCourses.length}
            />
            <ModalComponent
                isModalOpen={isModalEditOpen}
                toggleModal={toggleModalEdit}
                children={<CourseFormComponent toggleModal={toggleModalEdit} entity={entity} />}
                title={i18n.t("modules.courses.action.edit")}
                button={<></>}
            />
        </div>
    )
}