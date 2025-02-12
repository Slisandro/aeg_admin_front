import TableComponent from "../components/table-component";
import { useAllCourses } from "../hooks/use-all-courses-hook";

export const CoursesPage = () => {
    const allCourses = useAllCourses();

    if (allCourses.isLoading) return <>Loading</>

    if (allCourses.error) {
        alert(allCourses.error);
    }

    if (!allCourses.data?.getAllCourses) return <>Not found</>

    return (
        <div className="w-full col-start-2 lg:row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <TableComponent
                columns={[
                    "id",
                    "name",
                    "duration"
                ]}
                data={allCourses.data.getAllCourses}
                countPerPage={10}
            />
        </div>
    )
}