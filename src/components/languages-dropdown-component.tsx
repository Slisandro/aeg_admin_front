import { useContext, useState } from "react";
import { LANGUAGES } from "../constants/LANGUAGES";
import { Option } from "../interfaces/option-interface";
import ButtonLanguageComponent from "./button-languages-component";
import DropDownComponent from "./dropdown-component";
import i18n from "../i18n/config";
import { LanguageContext } from "../context/i18n-context";

export default function DropDownLanguagesComponent() {
    const [lang, setLang] = useState(i18n.locale === "es" ? 2 : 1);
    const { setLocale } = useContext(LanguageContext);

    const handleChangeLanguage = ({ key }: Option) => {
        setLang(key)
        setLocale(key === 1 ? "en" : "es");
        i18n.locale = key === 1 ? "en" : "es"
    }

    return (
        <DropDownComponent
            options={LANGUAGES}
            children={<ButtonLanguageComponent lang={lang} />}
            onSelect={handleChangeLanguage}
            classNameDropdown="z-10 absolute w-[10rem] top-14 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
        />
    )
}