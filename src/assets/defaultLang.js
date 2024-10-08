import languages from './json/languages.json';

export default function defaultLang() {
    if (languages.includes(window.navigator.language.slice(0, 2))) {
        return languages.indexOf(window.navigator.language.slice(0, 2));
    }
    return 0;
}