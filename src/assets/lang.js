import languages from './json/languages.json';

export default function lang(lang) {
    if ((lang === null) || (lang === undefined)) {
        if (languages.includes(window.navigator.language.slice(0, 2))) {
            return languages.indexOf(window.navigator.language.slice(0, 2));
        }
        return 0;
    }
    return lang;
}