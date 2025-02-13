import { useContext } from "react";
import { NavLink } from "react-router-dom";
// @ts-ignore
import { ITEMS_SIDEBAR } from "../constants/ITEMS_SIDEBAR";
import { LanguageContext } from "../context/i18n-context";
import i18n from "../i18n/config";
import ItemSideBar from "../interfaces/item-sidebar-interface";

export default function SideBarComponent() {
    const { } = useContext(LanguageContext);

    return (
        <section className="hidden lg:flex h-full row-start-2 shadow-2xl w-[200px] flex flex-col items-center justify-start gap-10 py-12 bg-[#f7f7f8]">
            {ITEMS_SIDEBAR.map(({ name, Icon, route }: ItemSideBar) => <SideBarItem route={route} name={name} Icon={Icon} />)}
        </section>
    )
}

export const SideBarItem = (
    { name, Icon, route }:
        {
            name: string,
            Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
            route: string
        }
) => (
    <NavLink to={route} className="flex items-center justify-center gap-4 w-full h-10">
        <Icon className="h-5 w-5" />
        <p className="text-black text-xl w-1/2 font-medium">
            {i18n.t(name)}
        </p>
    </NavLink>
)