import { useContext } from "react";
import TableComponent from "../components/table-component";
import { useAllUsers } from "../hooks/use-all-users-hook"
import i18n from "../i18n/config";
import { LanguageContext } from "../context/i18n-context";

export const UsersPage = () => {
    const allUsers = useAllUsers();
    const {} = useContext(LanguageContext);

    if(allUsers.isLoading) return <>Loading</>

    if(allUsers.error) {
        alert(allUsers.error);
    }

    if(!allUsers.data?.getAllUsers) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <TableComponent 
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
                data={allUsers.data.getAllUsers}
                countPerPage={allUsers.data.getAllUsers.length}
            />
        </div>
    )
}