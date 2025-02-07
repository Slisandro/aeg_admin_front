import TableComponent from "../components/table-component";
import { useAllUsers } from "../hooks/use-all-users-hook"

export const UsersPage = () => {
    const allUsers = useAllUsers();

    if(allUsers.isLoading) return <>Loading</>

    if(allUsers.error) {
        alert(allUsers.error);
    }

    if(!allUsers.data?.getAllUsers) return <>Not found</>

    return (
        <div className="w-full row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <TableComponent 
                columns={[
                    "id",
                    "name",
                    "email",
                    "role"
                ]}
                data={allUsers.data.getAllUsers}
                countPerPage={10}
            />
        </div>
    )
}