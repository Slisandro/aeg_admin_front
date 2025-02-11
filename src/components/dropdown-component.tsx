import { useState } from "react";
import { PropDropdown } from "../interfaces/props-dropdown-interface";
import { Option } from "../interfaces/option-interface";

export default function DropDownComponent ({ options, children, onSelect }: PropDropdown) {
    const [isOpen, setIsOpen] = useState(false);


    const handleSelect = (option: Option) => {
        if (option) {
            setIsOpen(!isOpen)
            onSelect(option)
        }
    }

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={toggleDropdown}>{children}</div>
            {isOpen && (
                <div className="z-10 absolute top-14 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {options.map((option) => (
                            <li key={option.key} onClick={() => handleSelect(option)}>
                                {option.content}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}