import { I18n } from 'i18n-js';
// json i18n
import * as translationEN from "./json/translation-en.json";
import * as translationES from "./json/translation-es.json";

const i18n = new I18n({
    en: translationEN,
    es: translationES
}, {
    locale: "es",
    enableFallback: true
});

export default i18n;