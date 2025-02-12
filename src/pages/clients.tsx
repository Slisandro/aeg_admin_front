import { useContext } from "react";
import TableComponent from "../components/table-component";
import { LanguageContext } from "../context/i18n-context";
import { useAllClients } from "../hooks/use-all-clients-hook";
import i18n from "../i18n/config";

export const ClientsPage = () => {
    const allClients = useAllClients();
    const {} = useContext(LanguageContext);

    if (allClients.isLoading) return <>Loading</>

    if (allClients.error) {
        alert(allClients.error);
    }

    if (!allClients.data?.getAllClients) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <TableComponent
                columns={[
                    i18n.t("modules.clients.table.columns.id"),
                    i18n.t("modules.clients.table.columns.name"),
                    i18n.t("modules.clients.table.columns.representative"),
                    i18n.t("modules.clients.table.columns.code"),
                ]}
                columnsKey={["id", "name", "representative", "code"]}
                data={allClients.data.getAllClients}
                countPerPage={allClients.data.getAllClients.length}
            />
        </div>
    )
}