import React, { ChangeEventHandler } from "react";
import i18n from "../i18n/config";

export default function InputComponent({ classNameContainer, type, error, touched, value, name, handleChange, handleBlur }: { value: any, error?: string, touched?: boolean, name: string, handleChange: ChangeEventHandler<HTMLInputElement>, type: React.HTMLInputTypeAttribute, handleBlur: React.FocusEventHandler<HTMLInputElement>, classNameContainer: string }) {
    return (
        <div className={classNameContainer}>
            <label 
                htmlFor={name} 
                className="text-lg font-semibold"
            >
                {i18n.t("modules.clients.table.columns." + name)}
            </label>
            <input 
                className={`px-2 py-3 outline-none border-2 rounded-lg 
                    ${touched && error ? 'border-red-500' : 'border-[rgba(0,0,0,.25)]'}
                `} 
                type={type} 
                name={name}
                value={value} 
                onChange={handleChange} 
                id={name} 
                onBlur={handleBlur} 
            />
            {touched && error && (<p className="text-red-500 pl-2 font-bold">{error}</p>)}
        </div>
    )
}