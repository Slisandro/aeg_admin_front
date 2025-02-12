import { ReactComponent as ClientsIcon } from '../assets/icons/clients-icon.svg';
import CardStatisticsComponent from "../components/card-statistics-component"
import { useUsersCount } from "../hooks/use-users-count-hook";
import { useClientsCount } from '../hooks/use-client-count-hook';
import { useCoursesCount } from '../hooks/use-courses-count-hook';
import { LanguageContext } from '../context/i18n-context';
import { useContext } from 'react';
import i18n from '../i18n/config';

export const DashboardPage = () => {
    const {} = useContext(LanguageContext);
    const usersCount = useUsersCount();
    const clientsCount = useClientsCount();
    const coursesCount = useCoursesCount();

    if (usersCount.isLoading || clientsCount.isLoading || coursesCount.isLoading) return <>Loading</>

    if (usersCount.error || clientsCount.error || coursesCount.isLoading) {
        alert(usersCount.error);
    }

    return (
        <div className="w-full col-span-2 lg:row-start-2 h-[max-content] p-6 flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-start gap-0 justify-start">
            <CardStatisticsComponent title={String(usersCount.data?.usersCount)} subtitle={i18n.t("modules.users.statistics.title")} Icon={ClientsIcon} />
            <CardStatisticsComponent title={String(clientsCount.data?.clientsCount)} subtitle={i18n.t("modules.clients.statistics.title")} Icon={ClientsIcon} />
            <CardStatisticsComponent title={String(coursesCount.data?.coursesCount)} subtitle={i18n.t("modules.courses.statistics.title")} Icon={ClientsIcon} />
            <CardStatisticsComponent title={String(coursesCount.data?.coursesCount)} subtitle={i18n.t("modules.constancies.statistics.title")} Icon={ClientsIcon} />
            <div></div>
        </div>
    )
}