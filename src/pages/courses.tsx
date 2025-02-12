import { useContext } from "react";
import TableComponent from "../components/table-component";
import { LanguageContext } from "../context/i18n-context";
import { useAllCourses } from "../hooks/use-all-courses-hook";
import i18n from "../i18n/config";

export const CoursesPage = () => {
    const allCourses = useAllCourses();
    const { } = useContext(LanguageContext);

    if (allCourses.isLoading) return <>Loading</>

    if (allCourses.error) {
        alert(allCourses.error);
    }

    if (!allCourses.data?.getAllCourses) return <>Not found</>

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <TableComponent
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
                data={allCourses.data.getAllCourses}
                countPerPage={allCourses.data.getAllCourses.length}
            />
        </div>
    )
}