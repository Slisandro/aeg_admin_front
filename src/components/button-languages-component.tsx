import { ReactComponent as SpanishLanguageIcon } from '../assets/icons/spanish-language-icon.svg';
import { ReactComponent as EnglishLanguageIcon } from '../assets/icons/english-language-icon.svg';

export default function ButtonLanguageComponent({ lang }: { lang: number }) {
    return (
        <button className="inline-flex items-center py-2 rounded-lg pr-4 pl-2 text-sm text-white font-bold text-center" type="button">
            {lang === 1 ? <EnglishLanguageIcon className="h-[2.5rem]" /> : <SpanishLanguageIcon className="h-[2.5rem]" />}
            <svg className="w-3 h-3 ms-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
        </button>
    )
}