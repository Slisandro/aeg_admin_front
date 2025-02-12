import { useState } from "react";
import { PropDropdown } from "../interfaces/props-dropdown-interface";
import { Option } from "../interfaces/option-interface";

export default function DropDownComponent({ options, children, onSelect, classNameDropdown }: PropDropdown) {
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
                <ul className={classNameDropdown}>
                    {options.map((option) => (
                        <li key={option.key} className="w-full py-2" onClick={() => handleSelect(option)}>
                            {option.content}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}