// import for each svg icon 
import { ReactComponent as ClientsIcon } from '../assets/icons/clients-icon.svg';
import { ReactComponent as ConstanciesIcon } from '../assets/icons/constancies-icon.svg';
import { ReactComponent as CoursesIcon } from '../assets/icons/courses-icon.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/home-icon.svg';
import { ReactComponent as UsersIcon } from '../assets/icons/users-icon.svg';
import { SideBarItem } from '../components/side-bar-component';

export const ITEMS_SIDEBAR_DROPDOWN = [
    {
        key: 1,
        content: <SideBarItem name="sidebar.home" Icon={HomeIcon} route="/" />
    },
    {
        key: 2,
        content: <SideBarItem name="sidebar.courses" Icon={CoursesIcon} route="/courses" />
    },
    {
        key: 3,
        content: <SideBarItem name="sidebar.users" Icon={UsersIcon} route="/users" />
    },
    {
        key: 4,
        content: <SideBarItem name="sidebar.clients" Icon={ClientsIcon} route="/clients" />
    },
    {
        key: 5,
        content: <SideBarItem name="sidebar.constancies" Icon={ConstanciesIcon} route="/constancies" />
    }
]