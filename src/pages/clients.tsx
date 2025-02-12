import TableComponent from "../components/table-component";
import { useAllClients } from "../hooks/use-all-clients-hook";

export const ClientsPage = () => {
    const allClients = useAllClients();

    if (allClients.isLoading) return <>Loading</>

    if (allClients.error) {
        alert(allClients.error);
    }

    if (!allClients.data?.getAllClients) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <TableComponent
                columns={[
                    "id",
                    "name",
                    "representative",
                    "code"
                ]}
                data={allClients.data.getAllClients}
                countPerPage={10}
            />
        </div>
    )
}