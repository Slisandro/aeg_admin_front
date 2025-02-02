import { ReactComponent as SpanishLanguageIcon } from '../assets/icons/spanish-language-icon.svg'; 
import { ReactComponent as EnglishLanguageIcon } from '../assets/icons/english-language-icon.svg'; 
import { Option } from "../interfaces/option-interface";

export const LANGUAGES : Option[] = [
    {
        key: 1,
        content: (
            <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                <div className="inline-flex items-center text-black text-lg font-semibold gap-2">
                    <EnglishLanguageIcon className="h-[2.5rem]" />
                    English
                </div>
            </button>
        )
    },
    {
        key: 2,
        content: (
            <button type="button" className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                <div className="inline-flex items-center text-black text-lg font-semibold gap-2">
                    <SpanishLanguageIcon className="h-[2.5rem]" />
                    Spanish
                </div>
            </button>
        )
    }
];