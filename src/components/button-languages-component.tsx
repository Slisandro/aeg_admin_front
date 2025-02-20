import { ReactComponent as SpanishLanguageIcon } from '../assets/icons/spanish-language-icon.svg';
import { ReactComponent as EnglishLanguageIcon } from '../assets/icons/english-language-icon.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-icon.svg';


export default function ButtonLanguageComponent({ lang }: { lang: number }) {
    return (
        <button className="inline-flex items-center py-2 rounded-lg pr-4 pl-2 text-sm text-white font-bold text-center" type="button">
            {lang === 1 ? <EnglishLanguageIcon className="h-[2.5rem]" /> : <SpanishLanguageIcon className="h-[2.5rem]" />}
            <ArrowIcon />
        </button>
    )
}