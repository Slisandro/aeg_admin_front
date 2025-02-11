// import for each svg icon 
import { ReactComponent as ClientsIcon } from '../assets/icons/clients-icon.svg';
import { ReactComponent as ConstanciesIcon } from '../assets/icons/constancies-icon.svg';
import { ReactComponent as CoursesIcon } from '../assets/icons/courses-icon.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/home-icon.svg';
import { ReactComponent as UsersIcon } from '../assets/icons/users-icon.svg';
import ItemSideBar from "../interfaces/item-sidebar-interface";

export const ITEMS_SIDEBAR : ItemSideBar[] = [
    {
        name: "sidebar.home",
        Icon: HomeIcon,
        route: "/"
    },
    {
        name: "sidebar.courses",
        Icon: CoursesIcon,
        route: "/courses"
    },
    {
        name: "sidebar.users",
        Icon: UsersIcon,
        route: "/users"
    },
    {
        name: "sidebar.clients",
        Icon: ClientsIcon,
        route: "/clients"
    },
    {
        name: "sidebar.constancies",
        Icon: ConstanciesIcon,
        route: "/constancies"
    },
]