import { useState } from "react";
import { LANGUAGES } from "../constants/LANGUAGES";
import { Option } from "../interfaces/option-interface";
import ButtonLanguageComponent from "./button-languages-component";
import DropDownComponent from "./dropdown-component";

export default function DropDownLanguagesComponent () {
    const [lang, setLang] = useState(1);

    return (
        <DropDownComponent
            options={LANGUAGES}
            children={<ButtonLanguageComponent lang={lang} />}
            onSelect={(op: Option) => setLang(op.key)}
        />
    )
}