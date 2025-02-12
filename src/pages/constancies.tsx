import TableComponent from "../components/table-component";
import { useAllConstancies } from "../hooks/use-all-constancies-hook"

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
                columns={[
                    "id",
                    "startDate",
                    "endDate",
                    "user.name",
                    "course.name",
                    "client.name"
                ]}
                data={allConstancies.data.getAllConstancies}
                countPerPage={10}
            />
        </div>
    )
}