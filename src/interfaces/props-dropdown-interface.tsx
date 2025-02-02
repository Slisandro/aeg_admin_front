import { ReactElement } from "react";
import { Option } from "./option-interface";

export interface PropDropdown {
    options: Option[],
    children: ReactElement,
    onSelect: (op: Option) => void;
}