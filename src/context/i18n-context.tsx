import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n/config';

export const LanguageContext = createContext({
    locale: i18n.locale,
    setLocale: (s: string) => { },
});

export const LanguageProvider = ({ children }: { children: any }) => {
    const [locale, setLocale] = useState(i18n.locale);

    useEffect(() => {
        i18n.locale = locale;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
};