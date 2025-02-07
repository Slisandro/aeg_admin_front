import { ReactComponent as ClientsIcon } from '../assets/icons/clients-icon.svg';
import CardStatisticsComponent from "../components/card-statistics-component"
import { useUsersCount } from "../hooks/use-users-count-hook";
import { useClientsCount } from '../hooks/use-client-count-hook';
import { useCoursesCount } from '../hooks/use-courses-count-hook';

export const DashboardPage = () => {

    const usersCount = useUsersCount();
    const clientsCount = useClientsCount();
    const coursesCount = useCoursesCount();

    if (usersCount.isLoading || clientsCount.isLoading || coursesCount.isLoading) return <>Loading</>

    if (usersCount.error || clientsCount.error || coursesCount.isLoading) {
        alert(usersCount.error);
    }

    return (
        <div className="w-full row-start-2 h-full p-6 flex items-start gap-0 justify-start">
            <CardStatisticsComponent title={String(usersCount.data?.usersCount)} subtitle='Users created' Icon={ClientsIcon} />
            <CardStatisticsComponent title={String(clientsCount.data?.clientsCount)} subtitle='Clients created' Icon={ClientsIcon} />
            <CardStatisticsComponent title={String(coursesCount.data?.coursesCount)} subtitle='Courses created' Icon={ClientsIcon} />
            <CardStatisticsComponent title={String(coursesCount.data?.coursesCount)} subtitle='Constancies created' Icon={ClientsIcon} />
            <div></div>
        </div>
    )
}