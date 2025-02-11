import { NavLink } from "react-router-dom";
import { ITEMS_SIDEBAR } from "../constants/ITEMS_SIDEBAR";
import i18n from "../i18n/config";
import { useContext } from "react";
import { LanguageContext } from "../context/i18n-context";

export default function SideBarComponent() {
    const { } = useContext(LanguageContext);

    return (
        <section className="h-full row-start-2 shadow-2xl w-[200px] flex flex-col items-center justify-start gap-12 py-12 bg-[#f7f7f8]">
            {ITEMS_SIDEBAR.map(({ name, Icon, route }) => <SideBarItem route={route} name={name} Icon={Icon} />)}
        </section>
    )
}

const SideBarItem = (
    { name, Icon, route }:
        {
            name: string,
            Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
            route: string
        }
) => (
    <NavLink to={route} className="flex items-center justify-center gap-4 w-full h-10">
        <Icon className="h-5 w-5 fill-transparent" />
        <p className="text-black text-xl w-1/2 font-medium">
            {i18n.t(name)}
        </p>
    </NavLink>
)