import { useContext } from "react";
import { ITEMS_SIDEBAR_DROPDOWN } from "../constants/ITEMS_SIDEBAR_DROPDOWN";
import DropDownComponent from "./dropdown-component";
import DropDownLanguagesComponent from "./languages-dropdown-component";
import UserLoggedComponent from "./user-logged-component";
import { LanguageContext } from "../context/i18n-context";

export default function HeaderComponent() {
    const {} = useContext(LanguageContext);
    
    return (
        <header className="h-[70px] col-span-2 py-4 px-7 flex items-center justify-between bg-[#2D68A2] shadow-xl">
            <div className="lg:hidden flex gap-4 items-center">
                <DropDownComponent
                    children={<button className="p-2 text-xl font-bolder text-white">=</button>}
                    onSelect={() => null}
                    options={ITEMS_SIDEBAR_DROPDOWN}
                    classNameDropdown="z-10 absolute top-14 left-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[16rem] dark:bg-gray-700 flex flex-col items-center list-none"
                />
                <h2 className="text-white text-2xl font-bold text-shadow-2xl text-shadow-red">AEG</h2>
            </div>
            <h2 className="hidden lg:block text-white text-2xl font-bold text-shadow-2xl text-shadow-red">AEG</h2>
            <div className="flex gap-4 items-center">
                <form className="max-w-sm mx-auto">
                    <div className="flex relative">
                        <DropDownLanguagesComponent />
                    </div>
                </form>
                <UserLoggedComponent />
            </div>
        </header>
    )
}