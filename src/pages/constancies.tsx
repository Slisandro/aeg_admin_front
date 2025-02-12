import TableComponent from "../components/table-component";
import { useAllConstancies } from "../hooks/use-all-constancies-hook"
import i18n from "../i18n/config";

export const ConstanciesPage = () => {
    const allConstancies = useAllConstancies();

    if(allConstancies.isLoading) return <>Loading</>

    if(allConstancies.error) {
        alert(allConstancies.error);
    }

    if(!allConstancies.data?.getAllConstancies) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <TableComponent 
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
                data={allConstancies.data.getAllConstancies}
                countPerPage={allConstancies.data.getAllConstancies.length}
            />
        </div>
    )
}