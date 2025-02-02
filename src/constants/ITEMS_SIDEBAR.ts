// import for each svg icon 
import { ReactComponent as HomeIcon } from '../assets/icons/home-icon.svg';
import { ReactComponent as CoursesIcon } from '../assets/icons/courses-icon.svg';
import { ReactComponent as UsersIcon } from '../assets/icons/users-icon.svg';
import { ReactComponent as ConstanciesIcon } from '../assets/icons/constancies-icon.svg';
import { ReactComponent as ClientsIcon } from '../assets/icons/clients-icon.svg';
import ItemSideBar from "../interfaces/item-sidebar-interface";

export const ITEMS_SIDEBAR : ItemSideBar[] = [
    {
        name: "Dashboard",
        Icon: HomeIcon,
    },
    {
        name: "Courses",
        Icon: CoursesIcon,
    },
    {
        name: "Users",
        Icon: UsersIcon,
    },
    {
        name: "Clients",
        Icon: ClientsIcon,
    },
    {
        name: "Constancies",
        Icon: ConstanciesIcon,
    },
]