import DropDownLanguagesComponent from "./languages-dropdown-component";
import UserLoggedComponent from "./user-logged-component";

export default function HeaderComponent() {
    return (
        <header className="h-[70px] col-span-2 py-4 px-7 flex items-center justify-between bg-[#2D68A2] shadow-xl">
            <h2 className="text-white text-2xl font-bold text-shadow-2xl text-shadow-red">AEG</h2>
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